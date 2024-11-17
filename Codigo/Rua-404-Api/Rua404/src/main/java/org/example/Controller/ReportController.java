package org.example.Controller;

import com.itextpdf.text.DocumentException;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.example.Service.RelatoriosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/report")
public class ReportController {
    
    @Autowired
    private RelatoriosService relatoriosService;

    @RequestMapping("/baixar")
    public ResponseEntity<byte[]> generateReportPDF(@RequestParam String tipoRelatorio) throws DocumentException, IOException{
    String reportContent="";
    switch (tipoRelatorio.toLowerCase()) {
        case "estoque":
            reportContent=relatoriosService.generateStockReport();
            break;
        case "usuarios":
            reportContent=relatoriosService.generateUsersReport();
            break;
        case "pedidos":
            reportContent=relatoriosService.generateOrdersReport();
            break;
        default:
            return ResponseEntity.badRequest().build();
    }
    relatoriosService.generatePDF(reportContent);
    File relatorio= new File("Relatorio.pdf");

    byte[] fileContent = new byte[(int) relatorio.length()];
    try(FileInputStream fis= new FileInputStream(relatorio)){
        fis.read(fileContent);
    }
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_PDF);
    headers.setContentDispositionFormData("attachment", "Relatorio.pdf");

    return new ResponseEntity<>(fileContent, headers,HttpStatus.OK);

    }

}
