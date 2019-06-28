function checkChange(checkMind,tbody,checkChild){
  $(checkMind).click(function(){
    const isChecked = this.checked;
    $(checkChild).each((k,v) => {
      v.checked = isChecked
    })
  })
  //选中项的数量 与 全部数相判断
  $(tbody).on('click',checkChild,function(){
    const allLength = $(checkChild).length;
    const chackedLength = $(checkChild + ':checked').length;
    $(checkMind)[0].checked = allLength == chackedLength;
  })
}

//比如这样使用   checkChange('#tin-check','tbody','.tin-tbody');  
//checkMind  ==  是全选框的 选择器check
//tbody   ==  托管给父元素
//checkChild ==  目标选中的 check
