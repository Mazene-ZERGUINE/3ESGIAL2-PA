package org.example;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;


public class PdfExporter {
    public  void export(List<?> list, String outputFile) {
        PDDocument document = new PDDocument();

        try {
            PDPage page = new PDPage();
            document.addPage(page);
            PDPageContentStream contentStream = new PDPageContentStream(document, page);

            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12); // Set the font

            float yPosition = page.getMediaBox().getHeight() - 50; // Set initial vertical position

            for (int i = 0; i < list.size(); i++) {
                Object object = list.get(i);
                String[] lines = extractFields(object).split("\n"); // Split into separate lines

                for (String line : lines) {
                    contentStream.beginText();
                    contentStream.newLineAtOffset(50, yPosition); // Set the position of the text
                    contentStream.showText(line);
                    contentStream.endText();
                    yPosition -= 15; // Adjust the vertical position for the next line
                }

                if (i < list.size() - 1) {
                    // Draw a line between objects
                    contentStream.setLineWidth(1f);
                    contentStream.moveTo(50, yPosition + 5); // Line starting point
                    contentStream.lineTo(page.getMediaBox().getWidth() - 50, yPosition + 5); // Line ending point
                    contentStream.stroke();
                    yPosition -= 10; // Adjust the vertical position for the line
                }
            }

            contentStream.close();
            document.save(outputFile);
            document.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    private static String extractFields(Object object) {
            StringBuilder sb = new StringBuilder();
            Class<?> clazz = object.getClass();

            Field[] fields = clazz.getDeclaredFields();
            for (Field field : fields) {
                field.setAccessible(true);
                try {
                    Object value = field.get(object);
                    sb.append(field.getName()).append(": ").append(value).append("\n");
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }

            return sb.toString();
        }
        
    }

