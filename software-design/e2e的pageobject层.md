### What is Page Object Model in Selenium?

Page Object Model, also known as POM, is a [design pattern in Selenium](https://www.browserstack.com/guide/design-patterns-in-automation-framework) that creates an object repository for storing all web elements. It helps reduce code duplication and improves test case maintenance.

In Page Object Model, consider each web page of an application as a class file. Each class file will contain only corresponding web page elements. Using these elements, testers can perform operations on the website under test.

#### **Advantages of Page Object Model**

- **Easy Maintenance**: POM is useful when there is a change in a UI element or a change in action. An example would be: a drop-down menu is changed to a radio button. In this case, POM helps to identify the page or screen to be modified. As every screen will have different Java files, this identification is necessary to make changes in the right files. This makes test cases easy to maintain and reduces errors.
- [**Code Reusability**](https://www.browserstack.com/guide/importance-of-code-reusability): As already discussed, all screens are independent. By using POM, one can use the test code for one screen, and reuse it in another test case. There is no need to rewrite code, thus saving time and effort.
- **Readability and Reliability of Scripts**: When all screens have independent java files, one can quickly identify actions performed on a particular screen by navigating through the java file. If a change must be made to a specific code section, it can be efficiently done without affecting other files.


1. 容易维护：将易变的WebElement获取和操作和用例逻辑分开，若后面页面dom结构调整了，也只需要修改这一层即可，这使得代码更好维护。此外，分层也让代码可读性变高了。
2. 代码复用率变高：用例间可以轻易地复用WebElement的代码
