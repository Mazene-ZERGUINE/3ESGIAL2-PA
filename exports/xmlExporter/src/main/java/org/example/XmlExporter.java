package org.example;

import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;

public class XmlExporter {
    public void export(List<?> list, String outputFile) {
        XMLOutputFactory xmlOutputFactory = XMLOutputFactory.newInstance();
        try {
            XMLStreamWriter writer = xmlOutputFactory.createXMLStreamWriter(new FileOutputStream(outputFile), "UTF-8");

            // Start the XML document
            writer.writeStartDocument("UTF-8", "1.0");
            writer.writeStartElement("data");

            for (Object object : list) {
                writer.writeStartElement("item");
                for (Field field : object.getClass().getDeclaredFields()) {
                    field.setAccessible(true);
                    String fieldName = field.getName();
                    Object value = field.get(object);
                    writer.writeStartElement(fieldName);
                    writer.writeCharacters(String.valueOf(value));
                    writer.writeEndElement();
                }
                writer.writeEndElement();
            }

            // End the XML document
            writer.writeEndElement();
            writer.writeEndDocument();

            writer.flush();
            writer.close();
        } catch (IOException | IllegalAccessException | XMLStreamException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        // Sample data
        List<Person> personList = List.of(
                new Person("John Doe", 25),
                new Person("Jane Smith", 30),
                new Person("Mike Johnson", 40)
        );

        String outputFile = "data.xml";

        XmlExporter xmlExporter = new XmlExporter();
        xmlExporter.export(personList, outputFile);

        System.out.println("Data exported to " + outputFile);
    }

    static class Person {
        private String name;
        private int age;

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public String getName() {
            return name;
        }

        public int getAge() {
            return age;
        }
    }
}
