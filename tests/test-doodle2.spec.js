import { test, expect } from '@playwright/test';
import { customtest } from '../utils/fixture';
import PageObjectManager from '../pageObjects/PageObjectManager';
import exp from 'constants';

let page
let context
let url = 'https://www.jdoodle.com/online-java-compiler'

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('/');
  await page.goto(url);
  await page.waitForLoadState('load');

})

test('Should display JDoodle Logo, Products, Solutions, Resources, Pricing', async () => {
  const pageObjectManager = new PageObjectManager(page);
  const javaCompilerPage = pageObjectManager.getJavaCompilerPageObject();
  // await page.goto('/');
  // await page.goto(url);
  // await page.waitForLoadState('load');
  await expect(javaCompilerPage.primarySection).toHaveScreenshot({ mask: [javaCompilerPage.searchBar], maxDiffPixelRatio: 0.05 });
});

//Custom Fixture 
customtest('Should Display Sections', async ({ Sections }) => {
  const pageObjectManager = new PageObjectManager(page);
  const javaCompilerPage = pageObjectManager.getJavaCompilerPageObject();
  // await page.goto('https://www.jdoodle.com/online-java-compiler');
  // await page.waitForLoadState('load');
  await javaCompilerPage.sections.hover();
  const texts = await javaCompilerPage.textOfSections.evaluateAll(list => list.map(ele => ele.textContent.trim()));
  console.log(texts);
  await expect(texts).toEqual(Sections);
});

//Note: This test is sometimes failing because of the captcha issues
test('Fetching the program values and Executing the program', async () => {
  let Inputs;
  await test.step('Fetching the program values', async () => {
    const pageObjectManager = new PageObjectManager(page);
    const javaCompilerPage = pageObjectManager.getJavaCompilerPageObject();
    // await page.goto('https://www.jdoodle.com/online-java-compiler');
    // await page.waitForLoadState('load');
    await expect(javaCompilerPage.txtOnlineJavaComipler).toBeVisible();
    await page.waitForTimeout(5000);
    Inputs = await javaCompilerPage.numbers.allInnerTexts();
    console.log(Inputs);
  }, { box: true })
  await test.step('Executing the Program', async () => {
    const pageObjectManager = new PageObjectManager(page)
    const javaCompilerPage = pageObjectManager.getJavaCompilerPageObject();
    await page.goto('https://www.jdoodle.com/online-java-compiler');
    await page.waitForLoadState('load');
    await javaCompilerPage.btnExecute.click();
    await page.waitForTimeout(10 * 1000);
    const InputNumbersSum = Inputs.map(input => parseInt(input)).reduce((sum, i) => sum = sum + i, 0);
    console.log(InputNumbersSum);
    await expect(javaCompilerPage.output).toContainText(`Sum of x+y = ${InputNumbersSum}`, { timeout: 60 * 1000 });

  }, { box: true });

});

test('Links Provided under the Products List', async () => {
  const pageObjectManager = new PageObjectManager(page);
  const javaCompilerPage = pageObjectManager.getJavaCompilerPageObject();
  // await page.goto('https://www.jdoodle.com/online-java-compiler');
  // await page.waitForLoadState('load');
  await javaCompilerPage.products.last().click();
  await expect(javaCompilerPage.productFooterDiv).toBeVisible();
  const countOfLinksInProductDiv = await javaCompilerPage.linksUnderProductDiv.count();
  const arrayOfUrls = []

  for (let i = 0; i < countOfLinksInProductDiv; i++) {
    await page.bringToFront();
    try {
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        javaCompilerPage.linksUnderProductDiv.nth(i).press("Control+Enter")
      ]);
      await newPage.waitForLoadState();
      console.log('Title>>', await newPage.title());
      console.log('URL>>', await newPage.url());
      //await arrayOfUrls.push(newPage.url())
      // const response =await page.request.get(await newPage.url())
      // await expect(response).not.toBeOK()
    } catch {
      continue;
    }
  }
  const noOfpages = await context.pages();
  console.log(noOfpages.length)

  for (let i = 0; i < noOfpages.length; i++) {
    const response = await page.request.get(await noOfpages[i].url())
    await expect(response).toBeOK()
  }



});

test('Should display sharing of tool', async () => {
  const pageObjectManager = new PageObjectManager(page);
  const javaCompilerPage = pageObjectManager.getJavaCompilerPageObject();
  // await page.goto('https://www.jdoodle.com/online-java-compiler');
  // await page.waitForLoadState('load');
  await expect(javaCompilerPage.sharingSection).toHaveScreenshot({ maxDiffPixelRatio: 0.05 });
});