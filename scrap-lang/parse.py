from lexer import *  
import ply.yacc as yacc
from evaluations import evalInst


def p_start(p):
    '''start : bloc '''
    #printTreeGraph(p[1])
    evalInst(p[1])


def p_bloc(p):
    """bloc : bloc statement
    | statement"""
    if len(p) == 3:
        p[0] = ('bloc', p[1], p[2])
    else:
        p[0] = ('bloc', p[1], 'empty')



def p_statement_assign(p):
    
    '''statement : NAME EQUALS expression SEMI 
                 | NAME EQUALS expression 
                 | NAME EQUALS statement  '''
    p[0] = ('ASSIGN', p[1], p[3])
    


def p_while_statement(p):
    ''' statement : WHILE expression RACC bloc LACC '''
    p[0] = ('WHILE' , p[2] , p[4])

def p_for_loop(p):
    ''' statement : FOR LPAREN statement TO NUMBER COMMA statement RPAREN RACC bloc LACC '''
    p[0] = ('FOR' , p[3] , p[5] , p[7] , p[10])


def p_eval_concatenation(p):
    '''statement : expression
                 | expression CONCAT statement
                 | PRINT CONCAT statement'''
    if len(p) == 2:
        p[0] = ("concat", p[1])
    else:
        p[0] = ("concat", p[1], p[3])


def p_statement_comment(p):
    '''statement : COMMENTS'''
    p[0] = ('COMMENT', p[1])
        
def p_if_els_statement(p):
    ''' statement : IF expression THEN statement
                  | IF expression THEN RACC bloc LACC  
                  | IF expression THEN RACC bloc LACC ELSEIF expression THEN RACC bloc LACC ELSE RACC bloc LACC 
                  | IF expression THEN RACC bloc LACC ELSE RACC bloc LACC 
                  | IF statement THEN RACC bloc LACC ELSE RACC bloc LACC 
                  | IF statement THEN statement
    
    '''
    if len(p) == 5 : p[0] = ('IF' , p[2] , p[4]) 
    if len(p) == 7 : p[0] = ('IF' , p[2], p[5]) 
    if len(p) == 17 : p[0] = ('IF' , p[2] , p[5] , p[8] , p[11] , p[15])
    if len(p) == 11 : p[0] = ('IF' , p[2] , p[5] , p[9])
        
def p_statement_print(p):
    '''statement : PRINT LPAREN expression RPAREN SEMI 
                 | PRINT STRING SEMI 
                 | PRINT LPAREN statement RPAREN SEMI'''
    if len(p) == 4 :
        p[0] = ('PRINTSTR' , p[2])
    else:
        p[0] = ('PRINT', p[3])



def p_print_prams(p):
    """print_params : expression
              | expression COMMA print_params 
              """
    
    if len(p) == 2:
        p[0] = ( "PRINT", p[1])
    else:
        p[0] = ( "PRINT",p[3], p[1])
        

def p_multi_print(p):
    ''' statement : PRINT LPAREN print_params  RPAREN SEMI '''
    
    p[0] = p[3]

def p_parameters(p):
    """params : NAME
              | NAME COMMA params"""
    if len(p) == 2:
        p[0] = p[1]
    else:
        p[0] = (p[3], p[1])


def p_multi_compare(p):
    ''' statement : expression INFF statement
                  | expression SUP statement 
                  | expression and statement 
                  | expression or statement
                  | expression SEMI '''
    
    if len(p) == 3 :
        p[0] = p[1]
    else:
        p[0] = ( p[2], p[1] , p[3])


def p_return_statamene(p):
    '''statement : RETURN expression SEMI'''
    p[0] = ('RETURN', p[2])

    
def p_function(p):
    ''' statement : FUNCTION NAME LPAREN RPAREN START bloc END 
                  | FUNCTION NAME LPAREN params RPAREN START bloc END '''
    
    if len(p) == 8 :
        p[0] = ('function' , p[2] , p[6] , 'empty')
    else:
        p[0] = ('function' , p[2] , p[7] , p[4])



def p_fetch_table(p):
    ''' statement : NAME DOTE FETCH LPAREN RPAREN SEMI '''
    p[0] = ('fetch_all' , p[1])

def p_is_html(p):
    ''' statement : NAME DOTE HTML LPAREN RPAREN SEMI '''
    p[0] = ('is_html' , p[1])


def p_get_table_by_id(p):
    ''' statement : NAME DOTE TABLEID LPAREN STRING RPAREN SEMI '''
    p[0] = ('table_id' , p[1] , p[5])

def p_scan(p):
    ''' statement : NAME DOTE SCAN LPAREN RPAREN SEMI 
                  | NAME EQUALS NAME DOTE SCAN LPAREN RPAREN SEMI'''
    p[0] = ('scan' , p[1])

def p_multi_assigne(p):
    ''' statement : params EQUALS param_call SEMI  '''
    
    p[0] = ( "ASSIGN", p[1] , p[3])
    

def p_function_call(p):
    ''' statement : NAME LPAREN RPAREN SEMI 
                  | NAME LPAREN param_call RPAREN SEMI'''
    if (len(p)) == 6:
        p[0] = ('CALL' , p[1] , p[3] )
    else:
        p[0] = ('CALL' , p[1] , 'empty') 

def p_expressions(p):
    """param_call : expression
                   | expression COMMA param_call"""
    if len(p) == 2:
        p[0] = p[1]
    else:
        p[0] = p[3], p[1]



def p_global_variables(p):
    ''' statement : DEFINE NAME EQUALS expression SEMI '''
    
    p[0] = ('global' , p[2] , p[4])


def p_expression_binop(p):
    '''expression : expression PLUS expression
                  | expression MINUS expression
                  | expression TIMES expression
                  | expression DIVIDE expression
                  | expression or expression
                  | expression and expression
                  | expression SUP expression
                  | expression INFF expression
                  | expression ISEQUAL expression
                  | expression NOTEQUAL expression
                  | expression ET expression
                  | expression OU expression

                  '''
    p[0] = (p[2], p[1] , p[3])


def p_incr_decr(p):
    ''' statement : NAME INCR SEMI 
                  | NAME DECR SEMI 
                  | NAME INCR 
                  | NAME DECR'''
    
    if p[2] == "++":
        p[0] = ('ASSIGN' , p[1] , ('+' , p[1] , 1))
    if p[2] == "--":
        p[0] = ('ASSIGN' , p[1] , ('-' , p[1] , 1))
    
 

def p_plus_min_eq(p):
    ''' statement : NAME PLUSEQ NUMBER SEMI 
                  | NAME MINEQ NUMBER SEMI 
                  | NAME PLUSEQ NUMBER 
                  | NAME MINEQ NUMBER '''
    if p[2] == "+=":
        p[0] = ('ASSIGN' , p[1] , ('+' , p[1] , p[3]))
    if p[2] == "-=":
        p[0] = ('ASSIGN' , p[1] , ('-' , p[1] , p[3]))    
    

def p_expression_uminus(p):
    'expression : MINUS expression '
    p[0] = -p[2]

def p_expression_group(p):
    'expression : LPAREN expression RPAREN'
    p[0] = p[2]

def p_expression_number(p):
    'expression : NUMBER'
    p[0] = p[1]

def p_expression_str(p):
    ''' expression : STRING '''
    p[0] = p[1]

def p_expression_name(p):
    'expression : NAME'
    p[0] = p[1]

def p_error(p):
    print("Syntax error at '%s'" % p.value)


def p_expression_true(p):
    'expression : TRUE'
    p[0] = True


def p_expression_false(p):
    'expression : FALSE'
    p[0] = False



yacc.yacc()