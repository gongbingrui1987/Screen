var Manager={
    isRun:false,
    init:function(){
        document.addEventListener('click',function(evt){

            var  target = evt.target;
            if(target.nodeName.toLowerCase()=='iframe'){
                target = target;
               if(target.classList.contains('middle')){
                   return
               }else{
                   if(Manager.isRun){return;}
                   else{
                       Manager.isRun = true;
                   }

                   var targetClass = target.classList[0],middleTarget = document.querySelector('.middle');
                   /*target.style.zIndex='200';
                   middleTarget.style.zIndex='1';*/
                   target.className = 'middle';
                   middleTarget.className =targetClass;

                   setTimeout(function(){
                       Manager.isRun=false;
                       var middleTarget = document.querySelector('.middle');
                       if(middleTarget.contentDocument.refresh) middleTarget.contentDocument.refresh();

                   },2000);
               }
            }
        });
    }
};
Manager.init();