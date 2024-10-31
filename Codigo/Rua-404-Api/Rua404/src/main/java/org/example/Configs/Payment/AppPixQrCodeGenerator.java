package org.example.Configs.Payment;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.nio.file.Path;

/**
 * Gera um QRCode PIX "Copia e Cola" e a devida imagem na pasta atual.
 * Este projeto foi baseado em uma biblioteca PHP disponível em
 * <a href="https://github.com/renatomb/php_qrcode_pix">https://github.com/renatomb/php_qrcode_pix</a>.
 *
 * @see <a href="https://github.com/bacen/pix-api">Documentação oficial do PIX no repositório do Banco Central</a>
 * @author Manoel Campos da Silva Filho
 */
@RestController
@RequestMapping("/payment")
class AppPixQRCodeGenerator {

    @GetMapping
    public String get() {
        final var imagePath = "qrcode.png";

        final var dadosPix =
                new DadosEnvioPix(
                        "Manoel Campos da Silva Fh", "manoelcampos@gmail.com",
                        new BigDecimal("1.0"), "Palmas", "PIX em Java");

        final var qrCodePix = new QRCodePix(dadosPix);
        qrCodePix.save(Path.of(imagePath));

        return qrCodePix.toString();
    }

}