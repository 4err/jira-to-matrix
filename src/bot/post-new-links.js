const Ramda = require('ramda');
const to = require('await-to-js').default;
const logger = require('debug')('post new links');
const marked = require('marked');
const redis = require('../redis-client');
const jira = require('../jira');
const translate = require('../locales');

async function postLink(issue, relation, related, mclient) {
    const roomID = await mclient.getRoomId(issue.key);
    if (!roomID) {
        return;
    }
    const values = {
        relation,
        key: related.key,
        summary: Ramda.path(['fields', 'summary'], related),
        ref: jira.issue.ref(related.key),
    };
    await mclient.sendHtmlMessage(
        roomID,
        translate('newLink'),
        marked(translate('newLinkMessage', values))
    );
}

async function handleLink(issueLink, mclient) {
    const link = await jira.link.get(issueLink.id);
    if (!link) {
        return;
    }
    const [err, isNew] = await to(
        redis.setnxAsync(`link|${link.id}`, '1')
    );
    if (err) {
        logger(`Redis error while SETNX new link\n${err.message}`);
        return;
    }
    if (!isNew) {
        return;
    }
    await postLink(link.inwardIssue, link.type.outward, link.outwardIssue, mclient);
    await postLink(link.outwardIssue, link.type.inward, link.inwardIssue, mclient);
}

async function handleLinks({mclient, body: hook}) {
    const links = Ramda.path(['issue', 'fields', 'issuelinks'])(hook);
    if (!links) {
        return;
    }
    links.forEach(async issueLink => {
        await handleLink(issueLink, mclient);
    });
}

const shouldPostChanges = ({body, mclient}) => Boolean(
    typeof body === 'object'
    && (
        body.webhookEvent === 'jira:issue_updated'
        || body.webhookEvent === 'jira:issue_created'
    )
    && typeof body.issue === 'object'
    && mclient
);

async function middleware(req) {
    if (shouldPostChanges(req)) {
        await handleLinks(req);
    }
}

module.exports = middleware;
