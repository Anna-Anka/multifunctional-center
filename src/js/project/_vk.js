import * as VKID from '@vkid/sdk';

VKID.Config.init({
    app: 52881883,
    redirectUrl: 'https://mysite.com',
    state: 'state',
    codeVerifier: 'codeVerifier',
    scope: 'phone email',
});


const authButton = document.createElement('button');
authButton.onclick = () => {
    // После авторизации будет редирект на адрес, указанный в параметре redirectUrl
    VKID.Auth.login()
        .catch(console.error);
};

document.getElementById('container').appendChild(authButton);

// VK.Widgets.CommunityMessages("vk_community_messages", 433458018);
// VK.Widgets.CommunityMessages("vk_community_messages", 52881883);