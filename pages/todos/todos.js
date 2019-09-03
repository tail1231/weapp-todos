// pages/todos/todos.js
Page({
  data:{
    //文本框数据模型
    search:'',
    //todos列表数据
    todos:[
      {name:'Learning HTML' , completed:false },
      {name:'Learning CSS' , completed:true },
      {name:'Learning JavaScript' , completed:false },
    ],
    leftCount:2,
    flag:true
  },
  //search中input文本框数据同步
  inputHandler(e){
    this.setData({
      search:e.detail.value
    })
  },
  //点击search中的加号按钮，获取到文本框中的值
  //然后将数据保存到列表中
  jiaHandler(){
    // if(this.data.search === '') return;
    if(!this.data.search) return;
    let todos=this.data.todos;
    let obj= {name:this.data.search,completed:false};
    todos.unshift(obj);
    this.setData({todos:todos , 
                  search:'' , 
                  leftCount:this.data.leftCount + 1})
  },
  toggleTodoHandler(e){
    let item = this.data.todos[e.currentTarget.dataset.index]
    item.completed =!item.completed;
    //根据切换状态决定任务剩余数量
    let leftCount = this.data.leftCount + (item.completed? -1:1)
    this.setData({
      todos:this.data.todos,
      leftCount:leftCount
    })
  },
  delTodoHandler(e){
    //根据索引值去找到对应项
    let todos = this.data.todos;
    //splice方法是删除指定元素，并且返回删除的元素,是以数组的形式返回的
    let item = todos.splice(e.currentTarget.dataset.index,1)
    // let leftCount = this.data.leftCount + (!item[0].completed? -1:0)
    let leftCount = this.data.leftCount +(item[0].completed?0:-1);
    this.setData({
      todos:todos,
      leftCount:leftCount
    })
  },
  toggleAllHandler(){
    this.data.flag=!this.data.flag;
    let todos = this.data.todos;
    todos.forEach(element=>{
      element.completed=this.data.flag;
    })
    let leftCount = this.data.flag?0:this.data.todos.length;
    this.setData({
      todos:todos,
      leftCount:leftCount
    })
  },
  clearHandler(){
    let todos=this.data.todos.filter(element=>{
      return !element.completed
    })
    this.setData({
      todos:todos
    })
  }
})
