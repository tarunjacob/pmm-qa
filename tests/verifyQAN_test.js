Feature("To verify and test the QAN Dashboard");

Before( async(I, loginPage, qanPage, adminPage) => {
    I.amOnPage(loginPage.url);
    loginPage.login("admin", "admin");
    I.amOnPage(qanPage.url);
    await I.waitForElement(qanPage.fields.iframe, 60);
    adminPage.applyTimer("5m");
    await I.switchTo(qanPage.fields.iframe);
});

Scenario('Open the QAN Dashboard and verify Filter groups exist', async (I, adminPage, qanPage) => {
    qanPage.waitForQANPageLoaded();
    await qanPage.changeResultsPerPage(50);
    qanPage.checkFilterGroups();
});

Scenario('Open the QAN Dashboard and verify Query Details section opened when user selects Query', async (I, adminPage, qanPage) => {
    qanPage.waitForQANPageLoaded();
    qanPage._selectDetails(2);
});

xScenario('Open the QAN Dashboard and verify Data in Table and Query Details', async (I, adminPage, qanPage) => {
    I.amOnPage(qanPage.url);
    await I.waitForElement(qanPage.fields.iframe, 60);
    adminPage.applyTimer("5m");
    await I.switchTo(qanPage.fields.iframe); // switch to first iframe
    I.wait(10);
    qanPage.applyFilter("ps");
    await qanPage.verifyDataSet(1);
    await qanPage.verifyDataSet(2);
    await qanPage.clearFilters();
});

Scenario('Open the QAN Dashboard and verify pagination', async (I, adminPage, qanPage) => {
    qanPage.waitForQANPageLoaded();
    qanPage.checkPagination();
    await qanPage.checkSparkLines();
    qanPage.checkTableHeaders();
    //qanPage.checkServerList();
    // I.switchTo();
});

xScenario('Open the QAN Dashboard and verify Tables tab in Query Details for Database=postgres filter', async (I, adminPage, qanPage) => {
    let filterToApply = 'postgres';
    qanPage.waitForQANPageLoaded();
    qanPage.applyFilter(filterToApply);
    qanPage._selectDetails(2);
    qanPage.selectSectionInDetails(qanPage.fields.tablesTabInDetails);
    await qanPage.verifyDetailsSectionDataExists(qanPage.tabs.tablesTab);
});

Scenario('Open the QAN Dashboard and verify Tables tab in Query Details for Environment=pgsql-dev filter', async (I, adminPage, qanPage) => {
    let filterToApply = 'pgsql-dev';
    qanPage.waitForQANPageLoaded();
    qanPage.applyFilter(filterToApply);
    qanPage._selectDetails(2);
    qanPage.selectSectionInDetails(qanPage.fields.tablesTabInDetails);
    await qanPage.verifyDetailsSectionDataExists(qanPage.tabs.tablesTab);
});

xScenario('Open the QAN Dashboard and verify Explain tab in Query Details for Database=postgres filter', async (I, adminPage, qanPage) => {
    let filterToApply = 'postgres';
    qanPage.waitForQANPageLoaded();
    qanPage.applyFilter(filterToApply);
    qanPage._selectDetails(2);
    qanPage.selectSectionInDetails(qanPage.fields.explainTabInDetails);
    await qanPage.verifyDetailsSectionDataExists(qanPage.tabs.explainTab);
});

Scenario('Open the QAN Dashboard and verify Explain tab in Query Details for Environment=pgsql-dev filter', async (I, adminPage, qanPage) => {
    let filterToApply = 'pgsql-dev';
    qanPage.waitForQANPageLoaded();
    qanPage.applyFilter(filterToApply);
    qanPage._selectDetails(2);
    qanPage.selectSectionInDetails(qanPage.fields.explainTabInDetails);
    await qanPage.verifyDetailsSectionDataExists(qanPage.tabs.explainTab);
});

Scenario('Open the QAN Dashboard and verify Adding new Column reflects in URL', async (I, adminPage, qanPage) => {
    let columnName = 'Query Count with errors';
    qanPage.waitForQANPageLoaded();
    qanPage.addColumnToQAN(columnName);
    qanPage.verifyURLContains(qanPage.urlParts.queryCountWithoutErrors);
});

Scenario('Open the QAN Dashboard and verify Adding new Database Filter reflects in URL', async (I, adminPage, qanPage) => {
    let filterToApply = 'local';
    qanPage.waitForQANPageLoaded();
    qanPage.applyFilter(filterToApply);
    qanPage.verifyURLContains(qanPage.urlParts.pmmManaged);
});

Scenario('Open the QAN Dashboard and verify Main Metric change reflects in URL', async (I, adminPage, qanPage) => {
    let metricToReplace = 'Load';
    let newMetricName = 'Lock Time';
    qanPage.waitForQANPageLoaded();
    qanPage.changeMetricTo(metricToReplace, newMetricName);
    qanPage.verifyURLContains(qanPage.urlParts.lockTime);
});