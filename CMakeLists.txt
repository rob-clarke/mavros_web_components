cmake_minimum_required(VERSION 3.10)

project(prometheus_ui)

add_custom_target(npm_install
    COMMAND npm install
    WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
    )

add_custom_target(babel_transpile ALL
    COMMAND npm run build
    DEPENDS npm_install
    WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
    )