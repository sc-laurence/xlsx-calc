var formulajs = require('formulajs');
const XLSX_CALC = require("../src");
var assert = require('assert');

describe('formulajs integration', function() {
    describe('XLSX_CALC.import_functions()', function() {
        it('imports the functions from formulajs', function() {
            XLSX_CALC.import_functions(formulajs);
            var workbook = {};
            workbook.Sheets = {};
            workbook.Sheets.Sheet1 = {};
            workbook.Sheets.Sheet1.A1 = {v: 2};
            workbook.Sheets.Sheet1.A2 = {v: 4};
            workbook.Sheets.Sheet1.A3 = {v: 8};
            workbook.Sheets.Sheet1.A4 = {v: 16};
            workbook.Sheets.Sheet1.A5 = {f: 'AVERAGEIF(A1:A4,">5")'};
            XLSX_CALC(workbook);
            assert.equal(workbook.Sheets.Sheet1.A5.v, 12);
        });
        it('imports the functions with dot names like BETA.DIST', function() {
            XLSX_CALC.import_functions(formulajs);
            var workbook = {Sheets: {Sheet1: {}}};
            workbook.Sheets.Sheet1.A5 = {f: 'BETA.DIST(2, 8, 10, true, 1, 3)'};
            XLSX_CALC(workbook);
            assert.equal(workbook.Sheets.Sheet1.A5.v.toFixed(10), (0.6854705810117458).toFixed(10));
        });
        it('doesn\'t import functions that are already explicitely defined in XLSX_CALC', function () {
            XLSX_CALC.xlsx_Fx.TRUNC = function () { return '' };
            XLSX_CALC.import_functions(formulajs);
            assert.equal(XLSX_CALC.xlsx_Fx.TRUNC === formulajs.TRUNC, false);
            XLSX_CALC.import_functions(formulajs, { override: true });
            assert.equal(XLSX_CALC.xlsx_Fx.TRUNC === formulajs.TRUNC, true);
        });
    });
    describe("check range", () => {
        var workbook = {};
        workbook.Sheets = {};
        workbook.Sheets.Sheet1 = {};
        workbook.Sheets.Sheet1.A1 = {v: 2};
        workbook.Sheets.Sheet1.A2 = {v: 4};
        workbook.Sheets.Sheet1.A3 = {v: 8};
        workbook.Sheets.Sheet1.A4 = {v: 16};

        workbook.Sheets.Sheet1.C1 = {v: 2};
        workbook.Sheets.Sheet1.C2 = {v: 4};
        workbook.Sheets.Sheet1.C3 = {v: 8};
        workbook.Sheets.Sheet1.C4 = {v: 16};
        // workbook.Sheets.Sheet1.A5 = {f: 'AVERAGEIF(A1:A4,">5")'};
        // workbook.Sheets.Sheet1.A5 = { f: "AVERAGE(VLOOKUP($D20,'ECONOMIC INDICATORS'!$D$4:$EO$252,MATCH(IF(AND(MONTH($J$12)>=1,MONTH($J$12)<=3),\"1Q\",IF(AND(MONTH($J$12)>=4,MONTH($J$12)<=6),\"2Q\",IF(AND(MONTH($J$12)>=7,MONTH($J$12)<=9),\"3Q\",\"4Q\")))&LEFT(RIGHT(K$10,3),2),'ECONOMIC INDICATORS'!$D$13:$EO$13,0),FALSE),VLOOKUP($D20,'ECONOMIC INDICATORS'!$D$4:$EO$252,MATCH(IF(AND(MONTH($J$12)>=1,MONTH($J$12)<=3),\"1Q\",IF(AND(MONTH($J$12)>=4,MONTH($J$12)<=6),\"2Q\",IF(AND(MONTH($J$12)>=7,MONTH($J$12)<=9),\"3Q\",\"4Q\")))&LEFT(RIGHT(K$10,3),2),'ECONOMIC INDICATORS'!$D$13:$EO$13,0)-1,FALSE),VLOOKUP($D20,'ECONOMIC INDICATORS'!$D$4:$EO$252,MATCH(IF(AND(MONTH($J$12)>=1,MONTH($J$12)<=3),\"1Q\",IF(AND(MONTH($J$12)>=4,MONTH($J$12)<=6),\"2Q\",IF(AND(MONTH($J$12)>=7,MONTH($J$12)<=9),\"3Q\",\"4Q\")))&LEFT(RIGHT(K$10,3),2),'ECONOMIC INDICATORS'!$D$13:$EO$13,0)-2,FALSE),VLOOKUP($D20,'ECONOMIC INDICATORS'!$D$4:$EO$252,MATCH(IF(AND(MONTH($J$12)>=1,MONTH($J$12)<=3),\"1Q\",IF(AND(MONTH($J$12)>=4,MONTH($J$12)<=6),\"2Q\",IF(AND(MONTH($J$12)>=7,MONTH($J$12)<=9),\"3Q\",\"4Q\")))&LEFT(RIGHT(K$10,3),2),'ECONOMIC INDICATORS'!$D$13:$EO$13,0)-3,FALSE))" };
        workbook.Sheets.Sheet1.A5 = {f: 'VLOOPUP("2", A2:C4, 2)'};
        XLSX_CALC.import_functions(formulajs);
        XLSX_CALC(workbook);
        assert.ok(true);
    });
});
