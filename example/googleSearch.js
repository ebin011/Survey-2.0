var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
    firefox = require('selenium-webdriver/firefox');
    chrome = require('selenium-webdriver/chrome');

  var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .usingServer('http://localhost:4444/wd/hub')
    .withCapabilities({
      browserName: "firefox",
      loggingPrefs: {
        driver: "ALL",
        performance: "ALL"
      },
      "moz:firefoxOptions": {
        prefs: {
          "dom.ipc.processCount": 8
        },
        log: {
          level: "trace"
        }
      }
    })
    .build();

  driver.getCapabilities().then(console.log);

driver.get('http://www.google.com');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.name('btnG')).click();
//driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.quit();

var driverChrome = new webdriver.Builder()
  .forBrowser('chrome')
  .usingServer('http://localhost:4444/wd/hub')
  .withCapabilities({
    browserName: "chrome",
    loggingPrefs: {
      driver: "ALL",
      performance: "ALL"
    },
    "moz:firefoxOptions": {
      prefs: {
        "dom.ipc.processCount": 8
      },
      log: {
        level: "trace"
      }
    }
  })
  .build();

driverChrome.getCapabilities().then(console.log);
driverChrome.get('http://www.google.com');
driverChrome.findElement(By.name('q')).sendKeys('webdriver');
driverChrome.findElement(By.name('btnG')).click();
//driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driverChrome.quit();
