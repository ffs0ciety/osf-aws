ARTIFACT_NAME := $(shell echo ${ARTIFACTS_DIR} | rev | cut -d '/' -f 1 | rev)

build_stage:
	cp -rf ./lambdas/${ARTIFACT_NAME}/* $(ARTIFACTS_DIR)
	cp ./tsconfig.json $(ARTIFACTS_DIR)
	cd $(ARTIFACTS_DIR) && npm install --omit=dev
	cd $(ARTIFACTS_DIR) && tsc

clean: 
	cd $(ARTIFACTS_DIR) && rm *ts* && rm *.map

build-createUser:
	$(MAKE) build_stage
	$(MAKE) clean
	
	
build-getUser:
	$(MAKE) build_stage