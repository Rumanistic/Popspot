package com.tjoeun.popspot.config;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.HashMap;



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
	
	
	public HashMap<String, String> editImage(String content, String company, String directory ) throws Exception {
		String setTag = content;
		String imgSrc = "";
		String dir = Paths.get(ROOTPATH, directory).toString();
		
		File countDir = new File(dir);
		File[] list = countDir.listFiles();
		if(list == null) {
			HashMap<String, String> resultSet = new HashMap<>();
			resultSet.put("content", setTag);
			resultSet.put("images", "");
			return resultSet;
		}
		int count = list.length + 1;
		
		String base64 = "base64,";
		HashMap<String, String> resultSet = new HashMap<>();
		StringBuilder imgs = new StringBuilder();
		
		while(setTag.contains("<img")) {
			int imgStart = setTag.indexOf("<img");
			int imgEnd = setTag.indexOf(">", imgStart);
			int baseStart = setTag.indexOf(base64, imgStart);
			int baseEnd = (baseStart != -1 ? setTag.indexOf("\"", baseStart) : -1);
			int fileNameEnd = setTag.indexOf(".png", imgStart);
			
			if(baseStart == -1 && imgStart == -1) {
				break;
			}
			
			System.out.println(
					imgStart +"|"+ 
					imgEnd +"|"+ 
					baseStart +"|"+ 
					baseEnd +"|"+ 
					fileNameEnd);
			
			if(baseStart != -1 && baseEnd != -1 && fileNameEnd == -1) {
				imgSrc = setTag.substring(baseStart + base64.length(), baseEnd);
				
				String fileExt = ".png";
				String fileName = new StringBuilder()
									.append(company)
									.append("_")
									.append(count)
									.append(fileExt)
									.toString();
				
				String fullPath = Paths.get(dir, fileName).toString();
				
				byte[] decodedBytes = Base64.getDecoder().decode(imgSrc);
				try (FileOutputStream fos = new FileOutputStream(fullPath)) {
					fos.write(decodedBytes);
				}
				
				if(imgs.length() > 0) {
					imgs.append(",");
				}
				
				imgs.append(company).append("_").append(count);
				setTag = setTag.replaceFirst("<img[^>]*>", "image" + count++);
			}
			
			if(baseStart == -1 && baseEnd == -1 && fileNameEnd != -1) {
				String imgNum = setTag.substring(fileNameEnd-1, fileNameEnd); 
//				System.out.println(imgNum +"|"+ setTag.charAt(93) + setTag.charAt(94) + setTag.charAt(95));
				if(imgs.length() > 0) {
					imgs.append(",");
				}
				
				imgs.append(company).append("_").append(imgNum);
				setTag = setTag.replaceFirst("<img[^>]*>", "image" + imgNum);
			}
		}
		
		System.out.println(setTag);
		resultSet.put("content", setTag);
		resultSet.put("images", imgs.toString());
		
		System.out.println(resultSet);
		return resultSet;
	}
}
