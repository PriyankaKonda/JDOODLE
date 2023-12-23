export default class JavaCompilerPageObject {

    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.primarySection = page.locator('.section-primary .justify-center').nth(0);
        this.border =page.locator('.border-primary > .border-primary').nth(0);
        this.sections = page.locator('.section-quinary .link-primary').first();
        this.textOfSections = page.locator('.section-quinary div button span');
        this.txtOnlineJavaComipler = page.getByText('Online Java Compiler IDE');
        this.btnExecute = page.getByRole('button', { name: 'Execute' });
        this.numbers = page.locator('.ace_line .ace_constant.ace_numeric');
        this.searchBar = page.locator('//*[@id="searchBar"]');
        this.products = page.getByRole('heading',{name:'Products',exact:true});
        this.productFooterDiv = page.locator('footer.view-container .grid div').filter({has:this.products});
        this.linksUnderProductDiv = this.productFooterDiv.locator('div a');
        this.sharingSection = page.locator('.section-primary').filter({hasText:'Share this awesome tool with your peers',exact:true}).last();
        this.output = page.locator('#output');
    }

}
