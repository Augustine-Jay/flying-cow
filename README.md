
## 安装和运行

1. 克隆项目仓库：

   \`\`\`  
   git clone https://github.com/Augustine-Jay/flying-cow.git</br>
   cd developer-evaluator </br> 
   \`\`\`

3. 安装依赖：

   \`\`\`
   npm install
   \`\`\`

   或者使用 yarn：

   \`\`\`
   yarn install
   \`\`\`

4. 运行开发服务器：

   \`\`\`
   npm run dev
   \`\`\`

   或者使用 yarn：

   \`\`\`
   yarn dev
   \`\`\`

5. 在浏览器中打开 \`http://localhost:3000\` 查看应用。

## 使用说明

1. 在首页点击"进入应用"按钮进入主界面。
2. 在"国籍预测"模块输入开发者名称，点击"预测国籍"按钮获取预测结果。
3. 在"开发者评级"模块输入开发者名称，点击"评估开发者"按钮获取评级结果。
4. 在"开发者列表"模块使用筛选器查找特定开发者或按条件筛选。
5. 查看"领域分布"图表了解开发者在不同领域的分布情况。

## API 说明

本项目需要后端 API 支持以下功能：

- \`/api/predict\`: 国籍预测
- \`/api/rate\`: 开发者评级
- \`/api/developers\`: 获取开发者列表
- \`/api/nationalities\`: 获取国籍列表
- \`/api/domain-distribution\`: 获取领域分布数据

