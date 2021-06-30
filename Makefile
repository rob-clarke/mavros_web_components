# Extension to make:
# Add @[PLUGIN](arg,...) to allow make to check for non-file targets
# Examples:
# @docker-image(image_name):


#@docker-image(mavros_web):
#	docker build -t mavros_web .

image:
	sudo docker build -t mavros_web .

run: image
	sudo docker run --rm -p 8080:8080 mavros_web

.PHONY: image run
