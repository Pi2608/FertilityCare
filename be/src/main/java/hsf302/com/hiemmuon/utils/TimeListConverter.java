package hsf302.com.hiemmuon.utils;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.sql.Time;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Converter
public class TimeListConverter implements AttributeConverter<List<Time>, String> {

    @Override
    public String convertToDatabaseColumn(List<Time> attribute) {
        if (attribute == null || attribute.isEmpty()) return "";
        return attribute.stream()
                .map(Time::toString)
                .collect(Collectors.joining(","));
    }

    @Override
    public List<Time> convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) return List.of();
        return Arrays.stream(dbData.split(","))
                .map(Time::valueOf)
                .collect(Collectors.toList());
    }
}