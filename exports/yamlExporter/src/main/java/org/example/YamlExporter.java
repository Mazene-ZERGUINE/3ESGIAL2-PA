package org.example;
import org.yaml.snakeyaml.DumperOptions;
import org.yaml.snakeyaml.Yaml;

import java.awt.*;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Hello world!
 *
 */
public class YamlExporter
{
    public void export(List<?> list , String filePath) {
        Yaml yaml = createYaml();
        List<Map<String, Object>> dataList = new ArrayList<>();
        for (Object object : list) {
            Map<String, Object> data = extractFields(object);
            dataList.add(data);
        }
        try (FileWriter writer = new FileWriter(filePath)) {
            String data =yaml.dump(dataList);
            writer.write(data);
            Desktop.getDesktop().open(new File(filePath));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static Yaml createYaml() {
        DumperOptions options = new DumperOptions();
        options.setDefaultFlowStyle(DumperOptions.FlowStyle.BLOCK);
        return new Yaml(options);
    }

    private static Map<String, Object> extractFields(Object object) {
        Map<String, Object> data = new LinkedHashMap<>();
        Class<?> clazz = object.getClass();

        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            try {
                Object value = field.get(object);
                data.put(field.getName(), value);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }

        return data;
    }
}
