export const globalVars = {
    windowEl: window,
    documentEl: document,
    htmlEl: document.documentElement,
    bodyEl: document.body,
    focusEl: [
        'a[href]',
        'input',
        'select',
        'textarea',
        'button',
        'iframe',
        '[contenteditable]',
        '[tabindex]:not([tabindex^="-"])'
    ],
};