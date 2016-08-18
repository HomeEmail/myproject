<?php

if ($_FILES["file"]["error"] > 0){
	echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
}else{
    $domain='ivanlao';
    
    $filename = explode(".",$_FILES["file"]["name"]);
    $uplodetime = date("ymdHis");
    $filename[0]=$uplodetime;
    $giftpicname=implode(".",$filename);
    $tmp_name = $_FILES['file']['tmp_name'];
    $q= new SaeStorage();
    $result=$q->upload($domain,$giftpicname, $tmp_name);
    
    $giftpicurl=$q->getUrl($domain,$giftpicname);
    
    if(!$result) {
    	echo "error";
    } else{
    	echo $giftpicurl;
        echo '<img src="'.$giftpicurl.'"/>';
    }
}
?> 
