from fasthtml.common import *

app, rt = fast_app()

@rt('/')
def home():
    return H1("hello")