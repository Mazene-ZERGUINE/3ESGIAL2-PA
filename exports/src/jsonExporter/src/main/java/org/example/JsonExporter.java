package org.example;
import org.json.JSONArray;
import org.json.JSONObject;

import java.awt.*;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

public class JsonExporter {
    public void export(List<?> list , String filePath) {
        JSONArray jsonArray = new JSONArray();
        for (Object object : list) {
            JSONObject jsonObject = extractFields(object);
            jsonArray.put(jsonObject);
        }

        try (FileWriter writer = new FileWriter(filePath)) {
            String data = jsonArray.toString();
            writer.write(data);
            Desktop.getDesktop().open(new File(filePath));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    private static JSONObject extractFields(Object object) {
        JSONObject jsonObject = new JSONObject();
        Class<?> clazz = object.getClass();

        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            try {
                Object value = field.get(object);
                jsonObject.put(field.getName(), value);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }

        return jsonObject;
    }
}
