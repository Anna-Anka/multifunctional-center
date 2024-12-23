import * as VKID from '@vkid/sdk';

VKID.Config.init({
    app: 52881883,
    redirectUrl: 'https://anna-anka.github.io/multifunctional-center/',
    state: 'state',
    codeVerifier: 'codeVerifier',
    scope: 'phone email',
});

const oneTap = new VKID.OneTap();

const container = document.getElementById('VkIdSdkOneTap');

if (container) {
    oneTap
        .render({ container })
        .on(VKID.WidgetEvents.ERROR, console.error);
}


// VK.Widgets.CommunityMessages("vk_community_messages", 433458018);
// VK.Widgets.CommunityMessages("vk_community_messages", 52881883);