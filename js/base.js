var Browser = { 
'isIE' : (navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0), 
'isFirefox' : navigator.userAgent.indexOf('Firefox') >= 0, 
'isOpera' : navigator.userAgent.indexOf('Opera') >= 0 
}; 

function $(s){
    return document.getElementById(s);
}
//�����¼���
function addEvent(el,eventType,fn){
    if(el.addEventListener){
        el.addEventListener(eventType,fn,false);
    }else if(el.attachEvent){
        el.attachEvent("on" + eventType,fn);
    }else{
        el["on"+eventType]=fn;
    }
}
//����¼���
function removeEvent(el,eventType,fn){
	if(el.removeEventListener){           //DOMģ����ɾ��mousemove��mouseup�ļ���������
		el.removeEventListener(eventType,fn,false);
	}else if(el.detachEvent){             //IEģ����ɾ��mousemove��mouseup�ļ���������
		el.detachEvent("on" + eventType,fn);			
	}else{                                      //IE5���°汾��ɾ��mousemove��mouseup�ļ���������
		
	}    
}
function trim(inputString) {
	return inputString.replace(/^[\s]+/,"").replace(/[\s]+$/,"");
}

function drawImageByStandard(im,x,y) {
	y = y || 99999;
	im.removeAttribute("width");
	im.removeAttribute("height");
 
	if( im.width/im.height > x/y  && im.width >x ){
	   im.height = im.height * (x/im.width)
	   im.width = x
	   im.parentNode.style.height = im.height * (x/im.width) + 'px'
	}else if( im.width/im.height <= x/y && im.height >y){
	   im.width = im.width * (y/im.height)
	   im.height = y
	   im.parentNode.style.height = y + 'px'
	}
	im.style.visibility = 'visible' 
}

//��ȡ��Ļ��ҳ��Ŀ��ߣ�����������ʽ����
function getSize() {
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){      // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else {      // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}

	var windowWidth, windowHeight;
	if (self.innerHeight) {      // all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) {      // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) {      // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}

	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
		y = pageHeight;
	} else {
		pageHeight = yScroll;
		y = pageHeight;
	}

	if(xScroll < windowWidth){
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}
	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight)
	return arrayPageSize;
}

//��дinsertAdjacentHTML���� ��ʼ
if (!document.all) {
    HTMLElement.prototype.insertAdjacentHTML = function (sWhere, sHTML) {
        var df;
        var r = this.ownerDocument.createRange();
        switch (String(sWhere).toLowerCase()) {
            case "beforebegin":
                r.setStartBefore(this);
                df = r.createContextualFragment(sHTML);
                this.parentNode.insertBefore(df, this);
                break;
            case "afterbegin":
                r.selectNodeContents(this);
                r.collapse(true);
                df = r.createContextualFragment(sHTML);
                this.insertBefore(df, this.firstChild);
                break;
            case "beforeend":
                r.selectNodeContents(this);
                r.collapse(false);
                df = r.createContextualFragment(sHTML);
                this.appendChild(df);
                break;
            case "afterend":
                r.setStartAfter(this);
                df = r.createContextualFragment(sHTML);
                this.parentNode.insertBefore(df, this.nextSibling);
                break;
        }
    };
}
//��дinsertAdjacentHTML���� ����

//�¼�ð����ֹ����
function cancelBubble(e){
	e = e || window.event;e.cancelBubble=true
}

//��ȡ��ǰ����ʽ����ֵ
function getCurrentStyle(obj, prop) {
	if (obj.currentStyle) {
		return obj.currentStyle[prop];
	}
	else if (window.getComputedStyle) {
		prop = prop.replace (/([A-Z])/g, "-$1");
		prop = prop.toLowerCase ();
		return window.getComputedStyle (obj, "").getPropertyValue(prop);
	}
	return null;
}

//ͨ��classname��ȡ�ڵ�
function getElementsByClassName(cls,elm,pobj) {
	cls = cls.replace(',','\\b.*\\b')	
	var arrCls =[];	
	var rexCls = new RegExp('\\b' + cls + '\\b','img');
	var lisElm = pobj.getElementsByTagName(elm);
	for (var i=0; i<lisElm.length; i++ ){
		var evaCls = lisElm[i].className;
		if( rexCls.test(evaCls) ){
			arrCls.push(lisElm[i]);
			rexCls.test(evaCls)
		}		
	}
	return arrCls;
}

/*
*��������getPreviousSibling:    ��ȡ��һ���ڵ�
*@param o:              �����ڵ㣻
*@return: �����ڵ����һ���ڵ㣬���Ϊ�շ��� null��
*/
function getPreviousSibling(o){
    var r = o.previousSibling
    while( r && r.nodeType !=1 ){
        r = r.previousSibling
    }
	
    return r
}
/*
*��������getNextSibling:    ��ȡ��һ���ڵ�
*@param o:              �����ڵ㣻
*@return: �����ڵ����һ���ڵ㣬���Ϊ�շ��� null��
*/
function getNextSibling(o){
    var r = o.nextSibling
    while( r && r.nodeType !=1 ){
        r = r.nextSibling
    }
    return r
}

/*
*��������getLastElementChild:    ��ȡ����Ԫ�ص����һ��element��Ԫ�أ�
*@param obj:    ����Ԫ�أ�
*@type Object
*@return: ���һ������Ϊelement����Ԫ�أ�
*/
function getLastElementChild(obj){
    var objChilds /*��Ԫ�ص�������Ԫ��*/ = obj.childNodes;
    for(var i=objChilds.length-1;i>=0;i--){
        if(objChilds[i].nodeType == 1){
            return objChilds[i];
            break;
        }
    }
    return null;
}

/*
*��������isLastElement:    �ж��Ƿ�Ϊ���һ�����ı��ӽڵ�
*@param o:    �ж϶���
*@type Object
*@return: boolean;
*/
function isLastElement(o){
	var t = getNextSibling(o);
	if( t && t.nodeType==1){return false;}else{return true;}
}

/*
*��������getFirstElementChild:   ��ȡ����Ԫ�صĵ�һ��element��Ԫ�أ�
*@param obj:    ����Ԫ�أ�
*@type Object
*@return: ��һ������Ϊelement����Ԫ�أ�
*/
function getFirstElementChild(obj){
    var objChilds /*��Ԫ�ص�������Ԫ��*/ = obj.childNodes;
    for(var i=0;i<objChilds.length;i++){
        if(objChilds[i].nodeType == 1){
            return objChilds[i];
            break;
        }
    }
    return null;    
}

/*
���ָ��className������ϲ�
*/
function getParentByClassName(classname,obj){
	classname = classname.replace(',','\\b.*\\b')	
	var rg = new RegExp('\\b'+classname+'\\b','ig')
    var pn = obj.parentNode || null;	
	while( pn &&!rg.test(pn.className) ){		
		var tg = pn.tagName ? pn.tagName.toLowerCase() : ''
		if( tg == 'body' ||  tg == '' || pn.parentNode && !pn.parentNode.tagName ){
			return null;
		}
		pn = pn.parentNode;
	}
    return pn;
}   

/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
		XMLHTTP ����
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/** ����xml���� *****************************************
*** ��������createXML								*****
*** ����ֵ��object XML����							*****
*** ����u������-str	����-XML�ļ���ַ��XML�ַ���		*****
*** ����f������-boolean	����-����async����			*****
********************************************************/
function createXML(u,f){
	var xmlDom
	if (window.ActiveXObject)
		xmlDom=new ActiveXObject('Microsoft.XMLDOM');
	else if (document.implementation && document.implementation.createDocument)
		xmlDom=document.implementation.createDocument('','',null);
	xmlDom.async = f || false
	xmlDom.preserveWhiteSpace=true;
	if(u.search('.xml')!=-1)
		xmlDom.load(u)
	else if(u!='' && u!=null){
		if(document.all)
			xmlDom.loadXML(u)
		else{
			var oParser = new DOMParser();
			xmlDom = oParser.parseFromString(u,'text/xml')
		}
	}
	return xmlDom
}
//Ajax���ú�����ʼ-----------------------------------
/** Ajax����   ******************************************
*** ��������makeRequest								*****
*** ����url������-str ����-����URL��ַ				*****
*** ����tid������-str ����-Ҫ�������ݵı�ǩid		*****
*** ����method������-str ����-���ݷ�ʽ				*****
*** ����urlStr������-str ����-post��ʽ�������ַ���	*****
*** ����handlefun������-����ָ�� ����-��������		*****
********************************************************/
function makeRequest(){	
	var url=arguments[0]			||""
	var tid=arguments[1]			||"bb"
	var method=arguments[2]			||"GET"	
	var urlStr=arguments[3]			||null
	var handlefun=arguments[4]		||handleStateChange

	if (url.indexOf('?')==-1){
		url+="?"
	}
	else{
		url+="&"
	}
	url+="timeStamp="+new Date().getTime()

	var http_request=false;
	if(!http_request){
		if(window.ActiveXObject){
			http_request=new ActiveXObject("Microsoft.XMLHTTP");
		}else if(window.XMLHttpRequest){
			http_request=new XMLHttpRequest;
		}
	}

	if(method.toUpperCase()=="POST"){	
		method="POST"
	}else{
		method="GET"
	}

	http_request.open(method,url,true);
	if(method=="POST"){
		http_request.setRequestHeader("content-length",urlStr.length); 
		http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
	}
	http_request.onreadystatechange=function(){handlefun(http_request,tid)}

	http_request.send(urlStr);
}
/** Ajax���õ�Ĭ�Ϻ�������   ****************************
*** ��������handleStateChange						*****
*** ����h������-HTTPRequest����						*****
*** ����t������-str ����-Ҫ�������ݵı�ǩid			*****
********************************************************/
function handleStateChange(h,t){
	if(h.readyState==4){
		if(h.status==200){
			if(document.getElementById(t)){					
				document.getElementById(t).innerHTML=h.responseText				
				
			}else{}					
		}
		else{
			alert(h.status)
		}
	}
}

//��̬���� css js �ļ�
function LinkScript(){
	this.filesadded = ''
	this.checkLoad = function(url,type,pos,id,nm){
		if(this.filesadded.indexOf("["+url+"]")==-1 ){
			this.load(url,type,pos,id,nm)
			
		}else{
			alert("file already added!")
		}
	}
	this.load = function(url,type,pos,id,nm){ 
		
		var fileref;
		if (type=="js"){ //�ж��ļ����� 
			fileref=document.createElement('script')//������ǩ 
			fileref.setAttribute("type","text/javascript")//��������type��ֵΪtext/javascript 
			fileref.setAttribute("src",url)//�ļ��ĵ�ַ 			
		} 
		else if (type=="css"){ //�ж��ļ����� 			
			fileref=document.createElement("link") 
			fileref.setAttribute("rel", "stylesheet") 
			fileref.setAttribute("type", "text/css")  
			fileref.setAttribute("href", url) 			
			if(id){
				fileref.setAttribute("id", id) 
			}
			if(nm){
				fileref.setAttribute("name", nm) 
			}
		} 
		
		if (typeof fileref!="undefined") {
			if(pos){				
				pos.parentNode.insertBefore(fileref,pos);
			}else{
				if($('ant_linkscript').innerHTML.indexOf(url) == -1){
					$('ant_linkscript').appendChild(fileref);
				}					
			}
			this.filesadded += '['+url+']'
			
		}
		var self=this;		
		
		fileref.onload=fileref.onreadystatechange=function(){
			if(this.readyState&&this.readyState=='loading') return;
			self.onsuccess();
		}
		fileref.onerror=function(){			
			self.onfailure();
		}
	}	
}
LinkScript.prototype.onsuccess = function(){
			
}

var toptoolbarstr = '<div class="mask_pr"> <div id="mask" class="mask"> <div id="mask_bg" class="mask_bg"></div> <div class="mask_ct">			<div id="popout_1" class="popout">			<iframe id="popout_iframe1" class="popindiv" name="popout_iframe1" src="about:blank" frameborder="no" scrolling="no"></iframe>				<iframe id="popout_iframe2" class="popindiv" name="popout_iframe2" src="about:blank" frameborder="no" scrolling="no"></iframe>				<a href="javascript:void(0)" onclick="ifrclose();return false"><img class="r ifrclose" src="http://www.51edu.com/zt/imgs/btn_close2.gif" /></a>	</div> </div> </div> </div> <input id="suitclass" type="hidden" value="bw l25 red"/> <input id="heightvalue" type="hidden" value="0"/> <div class="dn" id="tempblockacceptlf"></div> <div class="dn" id="tempblockacceptrg"></div> <div class="globalset"><div class="r mr14 b"><a target="_blank" href="http://www.51edu.com">��Ʒѧϰ��</a> <a target="_blank" href="http://www.sooker.com.com">�ѿ���</a> By <a href="http://www.iamued.com" target="_blank">RichieLiu</a></div> <ul id="leftset" class="leftset"> <li><a class="topswtt" href="javascript:void(0)" onclick="topToolSw(0);cssSetIni();this.blur();return false;">��Ƥ��</a>	<div class="pa pa1"> <div class="ant_palin"> <div class="ant_t30 dn">Ƥ����ʽcss��ַ��</div> <div class="csspath dn"><input type="text" id="csspath" name="csspath" value=""/></div> <div class="ant_t30">ѡ��ģ��</div> <div class="modesel">					<select id="mod_1" name="mod_1"> <option id="nullop" value="" selected>Ĭ��</option> </select> </div> <div class="ant_t30">Ԥ����</div> <div id="pagesnapshot" class="pagesnapshot"><div id="pagesnapshotcss"></div><div class="m7"> <div class="tt tt_0"> <div class="ttl"></div> <div class="icl"></div> <div class="ttc"><h3 class="ant_txt">title</h3></div> <div class="ttr"></div> <div class="icr mr"><a href="javascript:void(0)">����</a></div> </div>						</div> <div class="m7"> <div class="tt tt_1"> <div class="ttl"></div> <div class="icl"></div> <div class="ttc"><h3 class="ant_txt">title</h3></div> <div class="ttr"></div> <div class="icr mr"><a href="javascript:void(0)">����</a></div> </div>						</div> <div class="m7"> <div class="tt tt_2"> <div class="ttl"></div> <div class="icl"></div> <div class="ttc"><h3 class="ant_txt">title</h3></div> <div class="ttr"></div> <div class="icr mr"><a href="javascript:void(0)">����</a></div> </div>						</div> <div class="m7"> <div class="tt tt_3"> <div class="ttl"></div> <div class="icl"></div> <div class="ttc"><h3 class="ant_txt">title</h3></div> <div class="ttr"></div> <div class="icr mr"><a href="javascript:void(0)">����</a></div> </div>						</div> </div> <div class="ant_shieldff"><div class="ant_t30">DIY�滻Ƥ��</div> <div class="imgpath">����ͼƬ��<input type="text" id="imgpath" name="imgpath" value=""/> <a href="javascript:doChangeBgImg()" target="_self">�滻</a><div class="ant_s30">���ı���ͼ��ַ�ɸ���Ƥ��</div></div></div> </div> <div class="ant_cls30"> <input type="button" value=" ȷ�� " onclick="skinSet();topToolSw()" /> <input type="button" value=" �ر� " onclick="topToolSw()" /> </div> </div> </li> <li class="dn" ><a class="topswtt" href="javascript:void(0)" onclick="topToolSw(1);this.blur();return false;">2��Ƥ��</a> <div class="pa pa1"> <div class="ant_palin"> </div> <div class="ant_cls30"> <input type="button" value=" ȷ�� " onclick="" /> <input type="button" value=" �ر� " onclick="topToolSw()" /> </div> </div> </li> </ul></div> <div class="layeradd"> <a onclick="addLayer(this);return false;" title="����Layer" href="javascript:void(0)" class="btn_addlayer" id="btn_addlayer"></a><div class="l ml21"><input type="checkbox" checked id="dgcol" name="dgcol" align="absmiddle"/> layer�ȸ��У�ѡ�к󣬵������Layer�����еȸߡ���</div> </div> <div id="reborn" class="w952"><a class="btn_reborn" href="javascript:void(0)" title="�ָ���������" onclick="if(confirm(\'ȷ�ϻָ��������飿\')){ $(\'reborn\').style.display = \'none\';$(\'layer_0\').style.display = \'block\'};return false"></a></div>'
/*�������html�����ͨ���˷������ؿɱ༭״̬*/
function reEdit(uj,loc){	
	if(!$('whatiwant')){
		document.body.insertAdjacentHTML('afterbegin','<div id="whatiwant"><div id="layer_0" class="layer"><div id="a0_tube_0" class="tube col_952"></div><div class="c"></div></div></div>')
	}	
	if(!$('ant_linkscript')){
		
		document.body.insertAdjacentHTML('afterbegin','<div id="ant_linkscript"></div>')
	}

	var linkscript = new LinkScript()
	var jsurlpre = loc ? 'js/' : uj;
	var cssurlpre = loc ? 'css/' : uj;
	LinkScript.prototype.onsuccess = function(){
		LinkScript.prototype.onsuccess = function(){}
		$('antkuinijs').src = jsurlpre + 'antku_ini.js?t=32e3'
	}
	var sty = document.createElement('style');
	sty.setAttribute('type','text/css')
	sty.id = 'fixed'
	$('ant_linkscript').appendChild(sty);
	linkscript.checkLoad(jsurlpre+'antku.js?t=323','js')
	linkscript.checkLoad(cssurlpre+'alicn_bb_v0.3.css?t=03824','css')
	linkscript.checkLoad(cssurlpre+'antcom.css?t=0708241','css')
	if(!$('skincss')){
		linkscript.checkLoad(cssurlpre+'skin/skin_1.css?t=323','css',null,'skincss','http://www.51edu.com/zt/res/skin/skin_1.gif')	
	}
	linkscript.checkLoad(cssurlpre+'tube_v0.3.css?t=323','css')	
	
	//����������

	
	//��ԭ�༭���ܰ�Ŧ
	var delstr = ['<div id="ant_toptoolbar" class="del">'+toptoolbarstr+'</div>'  //0
	,'<div class="del layerctr" onmousedown="startMoveLayer(event)"><a class="btn_rmlayer" href="javascript:void(0)" title="ɾ��Layer_#SN" onclick="deleteLayer(\'#SN\');return false;" >#SN</a><a class="btn_smlayer" title="��С��/���" href="javascript:void(0)" onclick="pressMinAll(this,#SN);return false"></a></div>'  //1
	,'<a id="btn_addlayer" class="btn_addlayer" href="javascript:void(0)" title="����Layer" onclick="addLayer(this);return false;"></a>'  //2
	,'<DIV class="del ctrbar"><a class="btn_addblk" href="javascript:void(0)" title="�����������block��" onclick="showBox(this,5);return false" ></a></DIV>'  //3
	,'<DIV class="del ctrbar"><a class="btn_addblk" href="javascript:void(0)" title="�������block��" onclick="showBox(this,0);return false" ></a><a href="javascript:void(0)" class="btn_qkadd" title="����������Ӵ����" onclick="showIBox(this,2);return false;"></a></DIV>'  //4
	,'<a class="bar bar_x" href="#" onclick="closeContainer(this);return false"></a><a class="bar bar_min" href="#"  onclick="changeVisible(this);return false"></a><a class="bar bar_set" href="#" title="����Block��ʽ" onclick="setContainer(event,this);return false"></a><a class="del bar bar_code" href="#" title="block�����༭" onclick="setCode(event,this);return false"></a>'  //5
	,'<div class="del hdpr r"><div class="ttpa"><a class="bar bar_x" href="#" onclick="closeContainer(this);return false"></a><a class="bar bar_set" href="#" title="����Block��ʽ" onclick="setContainer(event,this);return false"></a></div></div>'  //6
	,'<div class="del ctrbar2"><a href="javascript:void(0)" onclick="clearCont(this,1);return false;">����</a> | <a href="javascript:void(0)" onclick="clearCont(this);return false;">���</a> | <a href="javascript:void(0)" onclick="showIBox(this);return false;">��������</a></div>'  //7
	,'<div id="sidetoolbar" class="udel sidetoolbar"><div class="toolbartop"><a id="toolbarsw" class="barclos" href="javascript:void(0)" onclick="toolBarClick(this);return false"></a></div><div id="toolbarbody" class="toolbarbody"><a href="javascript:void(0)" onclick="addLayer($(\'btn_addlayer\'));return false;">+ ���Ӳ�</a><A id="ant_infonotsee1" onclick="cleanPage();return false" href="javascript:void(0)">����ҳ��</A><a id=preview href="javascript:void(0)" onclick="if(this.innerHTML == \'Ԥ��\'){addPreView();clearJs();this.innerHTML=\'��ԭ\'}else{delPreView();restoreJs();this.innerHTML=\'Ԥ��\'};return false;" title="�� ~ ������Ԥ����">Ԥ��</a><!--a href="javascript:void(0)" id="ant_infonotsee2" onclick="try{outputHTML()}catch(e){};return false;">��;����</a--><a href="javascript:void(0)" onclick="try{outputHTML(1)}catch(e){};return false;">���մ���</a></div><div class="toolbarbot"></div></div>'  //8
	]
	
	var w = $('whatiwant')
	w.insertAdjacentHTML('afterbegin',delstr[0])

	var lays = getElementsByClassName('layer','div',document.body)
	var i = 0
	while(i<lays.length){
		var lid = lays[i].id.split('layer_')
		lid = lid[1]
		lays[i].insertAdjacentHTML('afterbegin',delstr[1].replace(/#SN/g,lid))			
		i++
	}

	var tubes = getElementsByClassName('tube','div',document.body)
	i = 0
	while(i<tubes.length){
		var tid = tubes[i].id.split('_tube_')
		tid = tid[0]
		if(tid=='a0'){
			tubes[i].insertAdjacentHTML('afterbegin',delstr[3])
		}else{
			tubes[i].insertAdjacentHTML('afterbegin',delstr[4])
		}
		i++
	}

	var blocks = getElementsByClassName('block','div',document.body)
	i = 0
	while(i<blocks.length){
		var bid = blocks[i].id.split('block_')
		bid = bid[1]		
		if($('cont_in_'+bid) && $('title_'+bid) && !getParentByClassName('box',$('title_'+bid)) ){
			blocks[i].insertAdjacentHTML('afterbegin','<div class="del hdpr r"><div class="ttpa">'+delstr[5]+'</div></div>')
		}else if($('cont_in_'+bid)){
			blocks[i].insertAdjacentHTML('afterbegin','<div class="del blkbar">'+delstr[5]+'</div>')			
		}else{
			blocks[i].insertAdjacentHTML('afterbegin',delstr[6])
		}
		var conts 
		if($('cont_in_'+bid).className.indexOf('cont_in') > -1){				
			conts = [$('cont_in_'+bid)]
		}else{
			conts = getElementsByClassName('cont','div',$('cont_in_'+bid))
		}			
		var j = 0
		while(j<conts.length){
			conts[j].insertAdjacentHTML('beforeend',delstr[7])				
			j++
		}			
		i++
	}

	$('whatiwant').insertAdjacentHTML('beforeend',delstr[8])	
	$('reedit').parentNode.removeChild($('reedit'))		
}

/*
���������ӵ������
*/
var dblClickNode,dblClickTm = 0,dblClickDelay = 300
var doClick = function (){}
var doDblClick = function (){}
var firstClick = function (){}