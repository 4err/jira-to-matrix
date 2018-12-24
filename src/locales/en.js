/* eslint-disable camelcase */
const dict = Object.freeze({
    comment_created: 'commented',
    comment_updated: 'changed comment',
    issue_updated: 'changed issue',
    issueHasChanged: 'Task was changed',
    statusHasChanged: '%{key} "%{summary}" now has status "%{status}"',
    statusHasChangedMessage: '%{name} changed a linked issue status [%{key} "%{summary}"](%{issueRef}) to **%{status}**',
    newIssueInEpic: 'New issue in epic',
    issueAddedToEpic: 'An issue [%{key} %{summary}](%{issueRef}) was added to the epic',
    newLink: 'New link',
    newLinkMessage: 'A new link. This issue **%{relation}** [%{key} "%{summary}"](%{issueRef})',
    deleteLink: 'Delete link',
    deleteLinkMessage: 'Link deleted. This issue **%{relation}** [%{key} "%{summary}"](%{issueRef})',
    miss: 'missing',
    epicAddedToProject: 'An epic [%{key} %{summary}](%{issueRef}) was added to the project',
    newEpicInProject: 'New epic in project',
    statusEpicChanged: 'Epic was changed',
    statusEpicChangedMessage: '%{name} changed a linked epic status [%{key} "%{summary}"](%{issueRef}) to **%{status}**',
    errorMatrixCommands: 'Something went wrong! Your request failed, please try again.',
    errorMatrixAssign: 'FATAL ERROR! User "%{userToFind}" don\'t exist.',
    successMatrixInvite: 'Successfully invited',
    errorMatrixInvite: 'Invite Error',
    successMatrixAssign: 'User "%{displayName}" appointed assignee',
    errorMatrixComment: 'Something went wrong! Comment not published',
    successMatrixComment: 'Comment published',
    listJiraCommand: 'List of available commands',
    errorMoveJira: 'ERROR! Transition is failed<br>Try again',
    successMoveJira: 'Issue status changed to %{name}',
    errorWatcherJira: 'The watcher is not added! Check user name and try again',
    successWatcherJira: 'Watcher was added',
    notFoundUser: 'User is not found',
    setPriority: 'Now issue has the priority %{name}',
    rightsError: 'You have no rights',
    successUserKick: 'User %{user} is kicked from room %{roomName}',
    errorUserKick: 'Error kicking user %{user} from room %{roomName}',
    kickInfo: 'User %{sender} has kicked next members from rooms:',
});

module.exports.dict = dict;
