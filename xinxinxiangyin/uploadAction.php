<?php


if ($_FILES["myFile"]["error"] > 0){
	echo "Return Code: " . $_FILES["myFile"]["error"] . "<br />";
}else{
    $domain='ivanlao';
    
    $filename = explode(".",$_FILES["myFile"]["name"]);
    $uplodetime = date("ymdHis");
    $filename[0]=$uplodetime;
    $giftpicname=implode(".",$filename);
    $tmp_name = $_FILES['myFile']['tmp_name'];
    $giftpicname='xinxinxiangyin/upload/'.$giftpicname;
    $q= new SaeStorage();
    $result=$q->upload($domain,$giftpicname, $tmp_name);
    
    $giftpicurl=$q->getUrl($domain,$giftpicname);
    
    if(!$result) {
    	echo "error";
    } else{
    	echo $giftpicurl;
        //echo '<img src="'.$giftpicurl.'"/>';
    }
}



/*
// we first include the upload class, as we will need it here to deal with the uploaded file
include('class.upload.php');

// set variables
$dir_dest = (isset($_GET['dir']) ? $_GET['dir'] : 'upload_file');
$dir_pics = (isset($_GET['pics']) ? $_GET['pics'] : $dir_dest);

header("Content-type: text/html; charset=utf-8");

// ---------- IMAGE UPLOAD ----------

// we create an instance of the class, giving as argument the PHP object
// corresponding to the file field from the form
// All the uploads are accessible from the PHP object $_FILES
$handle = new Upload($_FILES['myFile']);

// then we check if the file has been uploaded properly
// in its *temporary* location in the server (often, it is /tmp)
if ($handle->uploaded) {

	// yes, the file is on the server
	// below are some example settings which can be used if the uploaded file is an image.
	$handle->image_resize            = true;
	$handle->image_ratio_y           = true;
	$handle->image_x                 = 300;

	// now, we start the upload 'process'. That is, to copy the uploaded file
	// from its temporary location to the wanted location
	// It could be something like $handle->Process('/home/www/my_uploads/');
	$handle->Process($dir_dest);

	// we check if everything went OK
	if ($handle->processed) {
		// everything was fine !
		echo '<p class="result">';
		echo '  <b>File uploaded with success</b><br />';
		echo '  <img src="'.$dir_pics.'/' . $handle->file_dst_name . '" />';
		$info = getimagesize($handle->file_dst_pathname);
		echo '  File: <a href="'.$dir_pics.'/' . $handle->file_dst_name . '">' . $handle->file_dst_name . '</a><br/>';
		echo '   (' . $info['mime'] . ' - ' . $info[0] . ' x ' . $info[1] .' -  ' . round(filesize($handle->file_dst_pathname)/256)/4 . 'KB)';
		echo '</p>';
	} else {
		// one error occured
		echo '<p class="result">';
		echo '  <b>File not uploaded to the wanted location</b><br />';
		echo '  Error: ' . $handle->error . '';
		echo '</p>';
	}

	// we now process the image a second time, with some other settings
	$handle->image_resize            = true;
	$handle->image_ratio_y           = true;
	$handle->image_x                 = 300;
	$handle->image_reflection_height = '25%';
	$handle->image_contrast          = 50;

	$handle->Process($dir_dest);

	// we check if everything went OK
	if ($handle->processed) {
		// everything was fine !
		echo '<p class="result">';
		echo '  <b>File uploaded with success</b><br />';
		echo '  <img src="'.$dir_pics.'/' . $handle->file_dst_name . '" />';
		$info = getimagesize($handle->file_dst_pathname);
		echo '  File: <a href="'.$dir_pics.'/' . $handle->file_dst_name . '">' . $handle->file_dst_name . '</a><br/>';
		echo '   (' . $info['mime'] . ' - ' . $info[0] . ' x ' . $info[1] .' - ' . round(filesize($handle->file_dst_pathname)/256)/4 . 'KB)';
		echo '</p>';
	} else {
		// one error occured
		echo '<p class="result">';
		echo '  <b>File not uploaded to the wanted location</b><br />';
		echo '  Error: ' . $handle->error . '';
		echo '</p>';
	}

	// we delete the temporary files
	$handle-> Clean();

} else {
	// if we're here, the upload file failed for some reasons
	// i.e. the server didn't receive the file
	echo '<p class="result">';
	echo '  <b>File not uploaded on the server</b><br />';
	echo '  Error: ' . $handle->error . '';
	echo '</p>';
}


/*
   $uploaddir = "./upload_file/";//设置文件保存目录 注意包含/  
   $type=array("jpg","gif","jpeg","png");//设置允许上传文件的类型
   //$patch="http://localhost/win_mojavi2/htdocs/files/";//程序所在路径
	//$patch="http://127.0.0.1/cr_downloadphp/upload/files/";//程序所在路径
  
   //获取文件后缀名函数
    function fileext($filename){
        return substr(strrchr($filename, '.'), 1);
    }
   //生成随机文件名函数  
    function random($length){
        $hash = 'CR-';
        $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
        $max = strlen($chars) - 1;
        mt_srand((double)microtime() * 1000000);
		for($i = 0; $i < $length; $i++){
			$hash .= $chars[mt_rand(0, $max)];
		}
        return $hash;
    }
   $a=strtolower(fileext($_FILES['fileInput']['name']));
   //判断文件类型
   if(!in_array(strtolower(fileext($_FILES['fileInput']['name'])),$type)){
        $text=implode(",",$type);
        echo "您只能上传以下类型文件: ",$text,"<br>";
   } else {
	   //生成目标文件的文件名  
    	$filename=explode(".",$_FILES['fileInput']['name']);
        do{
            $filename[0]=random(10); //设置随机数长度
            $name=implode(".",$filename);
            //$name1=$name.".Mcncc";
            $uploadfile=$uploaddir.$name;
        }while(file_exists($uploadfile));
		
        if(move_uploaded_file($_FILES['fileInput']['tmp_name'],$uploadfile)){
            if(is_uploaded_file($_FILES['fileInput']['tmp_name'])){
                //输出图片预览
                echo "<center>您的文件已经上传完毕 上传图片预览: </center><br><center><img src='$uploadfile'></center>";
                echo"<br><center><a href='javascrīpt:history.go(-1)'>继续上传</a></center>";
             } else {
                echo "上传失败！";
             }
        }
   }*/
?>