package com.edu.missouristate.painting;

import com.edu.missouristate.painting.configuration.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
        FileStorageProperties.class
})
public class PaintingApplication {

    public static void main(String[] args) {
        SpringApplication.run(PaintingApplication.class, args);
    }

}
