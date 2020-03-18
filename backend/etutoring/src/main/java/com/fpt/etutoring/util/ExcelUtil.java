package com.fpt.etutoring.util;

import com.fpt.etutoring.export.ExcelCell;
import com.fpt.etutoring.export.ExcelSheet;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.joda.time.DateTime;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class ExcelUtil {

    public static <T> void exportToExcel(HttpServletRequest request, HttpServletResponse response, String fileName, List<T> data) throws Exception {
        Workbook wb = getWorkbook(data);
        String agent = request.getHeader("USER-AGENT").toLowerCase();
        try (OutputStream out = response.getOutputStream()) {
            response.setContentType("application/vnd.ms-excel");
            if (agent.contains("mozilla")) {
                response.setCharacterEncoding("utf-8");
                response.addHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes("gbk"), "iso8859-1"));
            } else {
                response.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
            }
            wb.write(out);
        } catch (Exception e) {
            log.error("exportToExcel, exception:{}", e);
            throw e;
        }
    }

    private static <T> Workbook getWorkbook(List<T> list) {
        Workbook wb = new SXSSFWorkbook();
        if (list != null && !list.isEmpty()) {
            try {
                makeSheet(wb, list);
            } catch (Exception e) {
                log.error(e.getMessage(), e);
            }
            return wb;
        } else {
            wb.createSheet("Sheet");
            return wb;
        }
    }

    private static <T> void makeSheet(Workbook wb, List<T> list) throws IllegalArgumentException, IllegalAccessException {
        Object titleRow = list.get(0);
        Sheet sheet = createSheet(wb, titleRow);
        CellStyle titleStyle = createTitleStyle(wb);
        makeSheetTitle(wb, sheet, titleRow, titleStyle);
        makeSheetData(wb, sheet, list);
    }

    private static Sheet createSheet(Workbook wb, Object titleRow) {
        Class<?> baseClazz = titleRow.getClass();
        ExcelSheet excelSheet = baseClazz.getAnnotation(ExcelSheet.class);
        return excelSheet != null ? wb.createSheet(excelSheet.value()) : wb.createSheet();
    }

    private static CellStyle createTitleStyle(Workbook wb) {
        CellStyle titleStyle = wb.createCellStyle();
        Font font = wb.createFont();
        font.setFontHeightInPoints((short) 13);
        font.setBold(true);
        font.setFontName("Arial");
        titleStyle.setFont(font);
        titleStyle.setBorderTop(BorderStyle.MEDIUM);
        titleStyle.setBorderBottom(BorderStyle.DASHED);
        titleStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        titleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        titleStyle.setWrapText(true);
        return titleStyle;
    }

    private static void makeSheetTitle(Workbook wb, Sheet sheet, Object titleRow, CellStyle titleStyle) {
        Class<?> baseClazz = titleRow.getClass();
        Row headRow = sheet.createRow(0);
        Field[] headFields = baseClazz.getDeclaredFields();
        int cHeadIndex = 0;
        Field[] var8 = headFields;
        int var9 = headFields.length;

        for (int var10 = 0; var10 < var9; ++var10) {
            Field field = var8[var10];
            ExcelCell excelCell = field.getAnnotation(ExcelCell.class);
            if (excelCell != null) {
                Cell cell = headRow.createCell(cHeadIndex);
                cell.setCellStyle(titleStyle);
                if (!"".equals(excelCell.value())) {
                    cell.setCellValue(excelCell.value());
                } else {
                    cell.setCellValue(field.getName());
                }

                sheet.setColumnWidth(cHeadIndex, (short) (35.7 * 150));
                ++cHeadIndex;
            }
        }
    }

    private static <T> void makeSheetData(Workbook wb, Sheet sheet, List<T> list) throws IllegalArgumentException, IllegalAccessException {
        Map<String, CellStyle> cellStyleMap = getCellStyleMap(wb);
        for (int rIndex = 0; rIndex < list.size(); ++rIndex) {
            Row row = sheet.createRow(1 + rIndex);
            Object rowData = list.get(rIndex);
            Class<?> clazz = rowData.getClass();
            Field[] fields = clazz.getDeclaredFields();
            int cIndex = 0;
            Field[] var10 = fields;
            int var11 = fields.length;

            for (int var12 = 0; var12 < var11; ++var12) {
                Field field = var10[var12];
                ExcelCell excelCell = field.getAnnotation(ExcelCell.class);
                if (excelCell != null) {
                    field.setAccessible(true);
                    Object value = field.get(rowData);
                    if (value != null) {
                        Cell cell = row.createCell(cIndex);
                        setCellValue(cell, value, field.getType(), excelCell, cellStyleMap);
                    }
                    ++cIndex;
                }
            }
        }
    }

    private static Map<String, CellStyle> getCellStyleMap(Workbook wb) {
        Map<String, CellStyle> cellStyleMap = new HashMap();
        CellStyle cellStyle4Num = wb.createCellStyle();
        cellStyle4Num.setDataFormat(HSSFDataFormat.getBuiltinFormat("0"));
        cellStyleMap.put("NUMBER", cellStyle4Num);
        return cellStyleMap;
    }

    private static void setCellValue(Cell cell, Object value, Class<?> fieldType, ExcelCell excelCell, Map<String, CellStyle> cellStyleMap) {
        String fieldTypeName = fieldType.getSimpleName();
        if (fieldTypeName.equals("Byte") || fieldTypeName.equals("byte")) {
            cell.setCellStyle((CellStyle) cellStyleMap.get("NUMBER"));
            cell.setCellValue((double) ((Byte) value).byteValue());
        } else if (fieldTypeName.equals("Short") || fieldTypeName.equals("short")) {
            cell.setCellStyle((CellStyle) cellStyleMap.get("NUMBER"));
            cell.setCellValue((double) ((Short) value).shortValue());
        } else if (fieldTypeName.equals("Integer") || fieldTypeName.equals("int")) {
            cell.setCellStyle((CellStyle) cellStyleMap.get("NUMBER"));
            cell.setCellValue((double) ((Integer) value).intValue());
        } else if (fieldTypeName.equals("Long") || fieldTypeName.equals("long")) {
            cell.setCellStyle((CellStyle) cellStyleMap.get("NUMBER"));
            cell.setCellValue((double) ((Long) value).longValue());
        } else if (fieldTypeName.equals("Float") || fieldTypeName.equals("float")) {
            cell.setCellStyle((CellStyle) cellStyleMap.get("NUMBER"));
            cell.setCellValue((double) ((Float) value).floatValue());
        } else if (fieldTypeName.equals("double") || fieldTypeName.equals("Double")) {
            cell.setCellStyle((CellStyle) cellStyleMap.get("NUMBER"));
            cell.setCellValue(((Double) value).doubleValue());
        } else if (fieldTypeName.equals("boolean") || fieldTypeName.equals("Boolean")) {
            cell.setCellStyle((CellStyle) cellStyleMap.get("NUMBER"));
            cell.setCellValue(((Boolean) value).booleanValue());
        } else if (fieldTypeName.equals("BigDecimal")) {
            cell.setCellStyle((CellStyle) cellStyleMap.get("NUMBER"));
            cell.setCellValue(((BigDecimal) value).doubleValue());
        } else if (fieldTypeName.equals("Date")) {
            cell.setCellValue((new DateTime(value)).toString(excelCell.timeFormat()));
        } else if (fieldTypeName.equals("DateTime")) {
            cell.setCellValue((new DateTime(value)).toString(excelCell.timeFormat()));
        } else if (fieldTypeName.equals("Timestamp")) {
            cell.setCellValue((new DateTime(value)).toString(excelCell.timeFormat()));
        } else {
            cell.setCellValue(String.valueOf(value));
        }
    }
}
