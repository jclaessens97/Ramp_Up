#!/bin/bash
'''
Exports SavedModel to a tfjs model
'''
tensorflowjs_converter --input_format=tf_saved_model --skip_op_check model dist/tfjs_model