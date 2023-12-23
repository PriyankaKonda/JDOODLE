
import JavaCompilerPageObject from './javaCompilerPageObject'
export default class PageObjectManager{

    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
constructor(page){
this.page = page
this.javaCompilerPageObject = new JavaCompilerPageObject(this.page)
}

getJavaCompilerPageObject(){
    return this.javaCompilerPageObject 
}

}