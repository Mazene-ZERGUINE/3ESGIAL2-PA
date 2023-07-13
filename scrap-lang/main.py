import sys 
from parse import yacc
import os 
import time
 
 
output_folder = 'out'
if len(sys.argv) == 1 :
    s = ''
    while 1 :
        s = input('scrape-lang >>> ')
        if s == "exit" :
            exit()
        elif s == "" :
            pass
        else :
            yacc.parse(s)

else :
    file = open(sys.argv[1] , "r")
    s = file.read() 
    yacc.parse(s)

