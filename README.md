# COMP-49X-24-25-the-brink

Author's:

- [Francisco Monarrez Felix](fmonarrezfelix@sandiego.edu)
- [Natalia Orlof Carson](norlofcarson@sandiego.edu)
- [Maeve Tierney](maevetierney@sandiego.edu)
- [Cristian St.Clair](cstclair@sandiego.edu)

### To run the containers for the project:

1. [Install and open the Docker Desktop Application](https://docs.docker.com/desktop/setup/install/mac-install/)
2. Verify the install by opening a terminal and running `docker info`
3. In your terminal, Run `docker pull postgres`
4. In your terminal, Run `cd the-brink`
5. Run the following command: `docker image build -t pitch-suite-react-image:latest .`
   You can verify the images were created in two ways:
   1. In the Docker Desktop Application, naviagte the the **Images** Tab. You should now see some images for the frontend of the application and the database of the application.
   2. Run `docker images` to see a list of all of the images you've created.
6. Run `docker-compose up`
   - You should get a message that the project was compiled successfully and you can now view the-brink in your browser.
   - Navigate to http://localhost:3000 to view the project. The project is now running entirely through containers.

From here there is more work to be done with the database.
We need to explore how to manipulate the database in our app files.
