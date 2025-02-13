package util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Properties;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletContext;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ServerConfig {
	public static Properties getServerConfig(ServletConfig config) throws URISyntaxException, IOException {
		ServletContext context = config.getServletContext();

		String resourcePath = "/WEB-INF/classes/server.conf";
		URL resourceUrl = context.getResource(resourcePath);
		if (resourceUrl == null) {
			throw new IllegalStateException("resourceUrl is null");
		}

		// file:\C:\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\homework0203\WEB-INF\classes\server.conf
		// 위와 같은 URI 형태로 나오는걸 FIleInputStream 은 직접적으로 지원하지 않는다. 그러므로 변환해서 넣어줘야한다.
		URI resourceFileUri = new URI(resourceUrl.toString());
		File resourceFile = new File(resourceFileUri);
		FileInputStream inputStream = new FileInputStream(resourceFile);

		Properties prop = new Properties();
		prop.load(inputStream);

		return prop;
	}
}