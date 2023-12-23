import { test, expect } from '@playwright/test';
import { customtest } from '../utils/fixture';
import PageObjectManager from '../pageObjects/PageObjectManager';
import exp from 'constants';

let url = 'https://www.jdoodle.com/online-java-compiler'
test('Should display JDoodle Logo, Products, Solutions, Resources, Pricing', async ({ page }) => {
  const pageObjectManager = new PageObjectManager(page)
  const javaCompilerPage = pageObjectManager.getJavaCompilerPageObject();
  await page.goto('/');
  await page.goto(url);
  await page.waitForLoadState('load');
  await expect(javaCompilerPage.primarySection).toHaveScreenshot({ mask: [javaCompilerPage.searchBar], maxDiffPixelRatio: 0.05 });
});

customtest('Should Display Sections', async ({ page, Sections }) => {
  const pageObjectManager = new PageObjectManager(page)
  const javaCompilerPage = pageObjectManager.getJavaCompilerPageObject();
  await page.goto('https://www.jdoodle.com/online-java-compiler');
  await page.waitForLoadState('load')
  //await javaCompilerPage.border.click()
  await javaCompilerPage.sections.hover()
  const texts = await javaCompilerPage.textOfSections.evaluateAll(list => list.map(ele => ele.textContent.trim()))
  console.log(texts)
  await expect(texts).toEqual(Sections)
});

//Note: This test is sometimes failing because of the captcha issues
test('Fetching the program values and Executing the program', async ({ page }) => {
  let Inputs;
  await test.step('Fetching the program values', async () => {
    const pageObjectManager = new PageObjectManager(page)
    const javaCompilerPage = pageObjectManager.getJavaCompilerPageObject();
    await page.goto('https://www.jdoodle.com/online-java-compiler');
    await page.waitForLoadState('load');
    await expect(javaCompilerPage.txtOnlineJavaComipler).toBeVisible();
    await page.waitForTimeout(5000);
    Inputs = await javaCompilerPage.numbers.allInnerTexts();
    console.log(Inputs)
  }, { box: true })
  await test.step('Executing the Program', async () => {
    const pageObjectManager = new PageObjectManager(page)
    const javaCompilerPage = pageObjectManager.getJavaCompilerPageObject();
    await page.goto('https://www.jdoodle.com/online-java-compiler');
    await page.waitForLoadState('load');
    await javaCompilerPage.btnExecute.click();
    await page.waitForTimeout(10*1000)
    const InputNumbersSum = Inputs.map(input => parseInt(input)).reduce((sum, i) => sum = sum + i, 0)
    console.log(InputNumbersSum)
    await expect(javaCompilerPage.output).toContainText(`Sum of x+y = ${InputNumbersSum}`, { timeout: 60 * 1000 })

  }, { box: true });

});

test('Links Provided under the Products List', async ({ page, context }) => {
  const pageObjectManager = new PageObjectManager(page)
  const javaCompilerPage = pageObjectManager.getJavaCompilerPageObject();
  await page.goto('https://www.jdoodle.com/online-java-compiler');
  await page.waitForLoadState('load');
  await javaCompilerPage.products.last().click();
  await expect(javaCompilerPage.productFooterDiv).toBeVisible();
  const countOfLinksInProductDiv = await javaCompilerPage.linksUnderProductDiv.count();

  for (let i = 0; i < countOfLinksInProductDiv; i++) {
    await page.bringToFront();
    try {
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        javaCompilerPage.linksUnderProductDiv.nth(i).press("Control+Enter")
      ]);
      await newPage.waitForLoadState();
      console.log('Title>>', await newPage.title())
      console.log('URL>>', newPage.url())
    } catch {
      continue;
    }
  }

});

test('Should display sharing of tool', async ({ page }) => {
  const pageObjectManager = new PageObjectManager(page)
  const javaCompilerPage = pageObjectManager.getJavaCompilerPageObject();
  await page.goto('https://www.jdoodle.com/online-java-compiler');
  await page.waitForLoadState('load');
  await expect(javaCompilerPage.sharingSection).toHaveScreenshot({ maxDiffPixelRatio: 0.05 });
});