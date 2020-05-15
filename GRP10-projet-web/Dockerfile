# Use the official image as a parent image.
FROM angular/ngcontainer

# Set the working directory.
WORKDIR /usr/src

# Copy the file from your host to your current location.
COPY package.json .

# Installation des dépendances manquantes
RUN sudo npm install -g npm-install-peers

RUN sudo npm-install-peers

# Run the command inside your image filesystem.
RUN sudo npm install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 4200

# Run the specified command within the container.
CMD ["ng", "serve"]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .
