Feature("Test Dashboards inside the Insights Folder");

Before((I, loginPage) => {
    I.amOnPage(loginPage.url);
    loginPage.login("admin", "admin");
});

Scenario('Open Advanced Exploration Dashboard and verify Metrics are present and graphs are displayed',
        async (I, dashboardPage) => {
    I.amOnPage(dashboardPage.advancedDataExplorationDashboard.url);
    dashboardPage.waitForDashboardOpened();
    dashboardPage.verifyMetricsExistence(dashboardPage.advancedDataExplorationDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData();
});

Scenario('Open Prometheus Dashboard and verify Metrics are present and graphs are displayed',
        async (I, adminPage, dashboardPage) => {
    I.amOnPage(dashboardPage.prometheusDashboard.url);
    dashboardPage.waitForDashboardOpened();
    await dashboardPage.expandEachDashboardRow();
    dashboardPage.verifyMetricsExistence(dashboardPage.prometheusDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA(9);
    await dashboardPage.verifyThereAreNoGraphsWithoutData();
});

Scenario('Open the Prometheus Exporters Status Dashboard and verify Metrics are present and graphs are displayed',
        async (I, dashboardPage) => {
    I.amOnPage(dashboardPage.prometheusExporterStatusDashboard.url);
    dashboardPage.waitForDashboardOpened();
    await dashboardPage.expandEachDashboardRow();
    dashboardPage.verifyMetricsExistence(dashboardPage.prometheusExporterStatusDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA(1);
    await dashboardPage.verifyThereAreNoGraphsWithoutData(2);
});

Scenario('Open the Prometheus Exporters Overview Dashboard and verify Metrics are present and graphs are displayed',
        async (I, dashboardPage) => {
    I.amOnPage(dashboardPage.prometheusExporterOverviewDashboard.url);
    dashboardPage.waitForDashboardOpened();
    dashboardPage.verifyMetricsExistence(dashboardPage.prometheusExporterOverviewDashboard.metrics);
    await dashboardPage.verifyThereAreNoGraphsWithNA();
    await dashboardPage.verifyThereAreNoGraphsWithoutData();
});