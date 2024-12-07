package com.tjoeun.popspot.config;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;



public class ImageManager {
	private final String ROOTPATH = System.getProperty("user.dir") + "/src/main/popspot/public/img/";
	
	public String createFolder(String company) throws Exception {
		String folderName = company.concat(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")).toString());
		
		Path dir = Paths.get(ROOTPATH, folderName);
		
		if (!Files.exists(dir)) {
            Files.createDirectory(dir);
        } else {
            System.out.println("Directory already exists: " + dir);
        }
		
		return dir.toString();
	}
	
	public HashMap<String, String> saveImage(String content, String company) throws Exception {
		String setTag = content;
		System.out.println(content + " | " + setTag);
		String imgSrc = "";
		int count = 1;
		String savedImgPath = createFolder(company);
		String base64 = "base64,";
		HashMap<String, String> resultSet = new HashMap<>();
		StringBuilder imgs = new StringBuilder();
		
		while(setTag.contains("<img")) {
			int imgStart = setTag.indexOf("<img");
			int baseStart = setTag.indexOf(base64, imgStart) + base64.length();
			int baseEnd = setTag.indexOf("\"", baseStart);
			
			if(baseStart != -1 && baseEnd != -1) {
				imgSrc = setTag.substring(baseStart, baseEnd);
				
				String fileExt = ".png";
				String fileName = new StringBuilder()
									.append(company)
									.append("_")
									.append(count)
									.append(fileExt)
									.toString();
				
				String fullPath = Paths.get(savedImgPath, fileName).toString();
				
				byte[] decodedBytes = Base64.getDecoder().decode(imgSrc);
				try (FileOutputStream fos = new FileOutputStream(fullPath)) {
					fos.write(decodedBytes);
				}
				
				if(imgs.length() > 0) {
					imgs.append(",");
				}
				
				imgs.append(company).append("_").append(count);
			}
			
			setTag = setTag.replaceFirst("<img[^>]*>", "image" + count++);
		}
		
		System.out.println(setTag);
		resultSet.put("content", setTag);
		resultSet.put("images", imgs.toString());
		
		return resultSet;
	}
	
	
	public HashMap<String, String> editImage(String content, String company, String directory, String images) throws Exception {
	    String setTag = content;
	    String dir = Paths.get(ROOTPATH, directory).toString();
	    
	    File dirFile = new File(dir);
	    if (!dirFile.exists()) {
	        dirFile.mkdirs(); // 디렉터리 생성
	    }

	    File[] list = dirFile.listFiles();
	    if (list == null) {
	        HashMap<String, String> resultSet = new HashMap<>();
	        resultSet.put("content", setTag);
	        resultSet.put("images", "");
	        return resultSet;
	    }

	    String base64 = "base64,";
	    HashMap<String, String> resultSet = new HashMap<>();
	    ArrayList<String> imgTagList = new ArrayList<>();
	    StringBuilder imgs = new StringBuilder(images != null ? images : "");

	    String imgTagPattern = "<img[^>]*>";
	    Pattern pattern = Pattern.compile(imgTagPattern);
	    Matcher matcher = pattern.matcher(content);
	    StringBuffer sb = new StringBuffer();
	    ArrayList<String> imageNames = new ArrayList<>();

	    while (matcher.find()) {
	        String imgTag = matcher.group();
	        
	        if(imgTag.contains("base64")) {
	        	imgTagList.add(imgTag); // 이미지 태그 저장
	        	String flag = "image" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));	        	
	        	matcher.appendReplacement(sb, flag); // 플래그로 대체
	        	imageNames.add(flag); // 이미지 이름 리스트 추가
	        	continue;
	        }
	        
	        String existingPattern = "src=\"([^\"]+_image_\\d+\\.png)\"";
	        Pattern srcPattern = Pattern.compile(existingPattern);
	        Matcher srcMatcher = srcPattern.matcher(imgTag);

	        if (srcMatcher.find()) {
	            String srcPath = srcMatcher.group(1); // 매칭된 src 경로
	            String flag = srcPath.substring(srcPath.indexOf("_image_") + 7, srcPath.lastIndexOf(".")); // "image[number]" 추출
	            matcher.appendReplacement(sb, "image" + flag); // 플래그로 대체
	            imageNames.add("image" + flag); // 이미지 이름 리스트 추가
	        }
	    }
	    matcher.appendTail(sb);
	    setTag = sb.toString();

	    for (int i = 0; i < imgTagList.size(); i++) {
	        String tagData = imgTagList.get(i);
	        int baseStart = tagData.indexOf(base64) + base64.length();
	        int baseEnd = tagData.indexOf("\"", baseStart);

	        String src = tagData.substring(baseStart, baseEnd);

	        String fileExt = ".png"; // 이미지 확장자 (필요시 변경 가능)
	        String fileName = company + "_" + imageNames.get(i);
	        String filePath = fileName + fileExt;
	        String fullPath = Paths.get(dir, filePath).toString();

	        try {
	            byte[] decodedBytes = Base64.getDecoder().decode(src);
	            try (FileOutputStream fos = new FileOutputStream(fullPath)) {
	                fos.write(decodedBytes);
	            }
	            if (imgs.length() > 0 && imgs.charAt(imgs.length() - 1) != ',') {
	                imgs.append(',');
	            }
	            imgs.append(fileName);
	        } catch (Exception e) {
	            System.err.println("Error saving image: " + e.getMessage());
	            e.printStackTrace();
	        }
	    }

	    resultSet.put("content", setTag);
	    resultSet.put("images", imgs.toString());

	    return resultSet;
	}
}
