项目中遇到一个问题：
要实现一个antdModal.confirm的效果，可以通过reactDom.render来实现。
![image](https://user-images.githubusercontent.com/22932241/167830206-0f9b0919-eb0d-483b-9be9-9d0384986c4a.png)

但问题是ReactDOM.render()重新生成的dom树结构，导致App.ts文件配置的全局 ConfigProvider 不生效，modal无法获取当前的语言包。

那antdModal.confirm是如何解决这个问题的呢：
放图：
![image](https://user-images.githubusercontent.com/22932241/167830689-c6557e60-7988-4ede-ae47-40256d4a082c.png)

![image](https://user-images.githubusercontent.com/22932241/167830530-ff510a65-2280-49ba-9a48-819e0d838656.png)

![image](https://user-images.githubusercontent.com/22932241/167830581-a59767eb-8525-47f6-a38f-cbdd132a1839.png)
