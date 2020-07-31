#!/bin/bash
#Exports SavedModel to a tfjs model
tensorflowjs_converter --input_format=tf_saved_model model dist/tfjs_model
cp -r dist/ ../webclient/static/ml/
