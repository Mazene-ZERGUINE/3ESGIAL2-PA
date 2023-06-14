package org.example;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

public class XlsxExporter {
    public void export(List<?> list, String outputFile) {
        Workbook workbook = new SXSSFWorkbook();
        Sheet sheet = workbook.createSheet("Data");

        int rowNum = 0;

        // Create header row
        Row headerRow = sheet.createRow(rowNum++);
        int colNum = 0;
        for (Field field : list.get(0).getClass().getDeclaredFields()) {
            field.setAccessible(true);
            String fieldName = field.getName();
            Cell cell = headerRow.createCell(colNum++);
            cell.setCellValue(fieldName);
        }

        // Create data rows
        for (Object object : list) {
            Row row = sheet.createRow(rowNum++);
            colNum = 0;
            for (Field field : object.getClass().getDeclaredFields()) {
                field.setAccessible(true);
                try {
                    Object value = field.get(object);
                    Cell cell = row.createCell(colNum++);
                    if (value instanceof String) {
                        cell.setCellValue((String) value);
                    } else if (value instanceof Integer) {
                        cell.setCellValue((Integer) value);
                    } else if (value instanceof Double) {
                        cell.setCellValue((Double) value);
                    } // Add more conditions for other data types if needed
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        }

        // Auto-size columns
        for (int i = 0; i < list.get(0).getClass().getDeclaredFields().length; i++) {
            sheet.autoSizeColumn(i);
        }

        try (FileOutputStream outputStream = new FileOutputStream(outputFile)) {
            workbook.write(outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
