// Copyright (c) 2017 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addReaction, removePost} from 'mattermost-redux/actions/posts';
import {getChannel, isCurrentChannelReadOnly} from 'mattermost-redux/selectors/entities/channels';
import {get, getBool} from 'mattermost-redux/selectors/entities/preferences';
import {getConfig} from 'mattermost-redux/selectors/entities/general';

import {Preferences} from 'utils/constants.jsx';

import PostInfo from './post_info.jsx';

function mapStateToProps(state, ownProps) {
    const config = getConfig(state);
    const enableEmojiPicker = config.EnableEmojiPicker === 'true';

    const channel = getChannel(state, ownProps.post.channel_id) || {};
    const teamId = channel.team_id;

    return {
        teamId,
        useMilitaryTime: getBool(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.USE_MILITARY_TIME, false),
        isFlagged: get(state, Preferences.CATEGORY_FLAGGED_POST, ownProps.post.id, null) != null,
        isMobile: state.views.channel.mobileView,
        enableEmojiPicker,
        isReadOnly: isCurrentChannelReadOnly(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            removePost,
            addReaction,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostInfo);
