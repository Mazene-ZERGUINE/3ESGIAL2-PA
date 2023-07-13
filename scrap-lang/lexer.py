import ply.lex as lex

precedence = (
 
    ('left','or'),
    ('left','and'),
    ('nonassoc','EQUALS','SUP'),
    ('left','PLUS','MINUS'),
    ('left','TIMES','DIVIDE'),
 
    )
 
 
reserved = {
    'print' : 'PRINT',
    'if' : 'IF' ,
    'OR' : 'or' ,
    'AND' : 'and',
    'if' : 'IF' , 
    'else' : 'ELSE',
    'elseif' : 'ELSEIF',
    'for' : 'FOR',
    'to' : 'TO',
    'while' : 'WHILE',
    'fun' : 'FUNCTION',
    'start' : 'START' ,
    'end' : 'END' ,
    'return': 'RETURN',
    'def' : 'DEFINE',
    'is_html' : "HTML",
    'scan': 'SCAN',
    'get_table_by_id': 'TABLEID',
    'false': 'FALSE',
    'true': 'TRUE'
}


tokens = [
    'NAME','NUMBER',
    'PLUS','MINUS','TIMES','DIVIDE','EQUALS', "ISEQUAL", "NOTEQUAL",
    'LPAREN','RPAREN', 'SEMI', "ET" , "OU",'RACC' , 'LACC', 'THEN' , "COMMA", 'STRING',
    'SUP' , "INFF"  , "INCR" , "DECR" , 'PLUSEQ' , 'MINEQ' , 'COMMENT' , 'COMMENTS' , "DOTE" , "CONCAT"] + list(reserved.values())

t_PLUS    = r'\+'
t_MINUS   = r'-'
t_TIMES   = r'\*'
t_DIVIDE  = r'/'
t_EQUALS  = r'='
t_LPAREN  = r'\('
t_RPAREN  = r'\)'
t_SEMI    = r';'
t_SUP = r'>'
t_INFF = r'<'
t_ISEQUAL = r'=='
t_NOTEQUAL = r'!='
t_ET = r'&' 
t_OU = r'\|'
t_RACC = r'{'
t_LACC = r'}'
t_THEN = r'->'
t_COMMA = r',' 
t_INCR = r'\+\+'
t_DECR = r'--'
t_PLUSEQ = r'\+\='
t_MINEQ = r'-='
t_STRING = r'"[^"]+"'
t_COMMENTS = r'\/\*.*\*\/'
t_DOTE = r'\::'
t_CONCAT = r'\?.'



def t_NAME(t):
    r'[a-zA-Z_][a-zA-Z_0-9]*'
    t.type = reserved.get(t.value,'NAME')    # Check for reserved words
    return t

def t_NUMBER(t):
    r'\d+'
    t.value = int(t.value)
    return t

# Ignored characters
t_ignore = " \t"

def t_newline(t):
    r'\n+'
    t.lexer.lineno += t.value.count("\n")

def t_error(t):
    print("Illegal character '%s'" % t.value[0])
    t.lexer.skip(1)


lex.lex()