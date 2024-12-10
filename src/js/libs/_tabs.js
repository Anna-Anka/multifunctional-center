import GraphTabs from 'graph-tabs';

if (document.querySelector('[data-tabs="services-page"]')) {
    new GraphTabs('services-page');
}

if (document.querySelector('[data-tabs="all-news"]')) {
    new GraphTabs('all-news');
}

if (document.querySelector('[data-tabs="documents-page"]')) {
    new GraphTabs('documents-page');
}
