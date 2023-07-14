
# parsetab.py
# This file is automatically generated. Do not edit.
# pylint: disable=W,C,R
_tabversion = '3.10'

_lr_method = 'LALR'

_lr_signature = 'leftorleftandnonassocEQUALSSUPleftPLUSMINUSleftTIMESDIVIDECOMMA COMMENT COMMENTS CONCAT DECR DEFINE DIVIDE DOTE ELSE ELSEIF END EQUALS ET FALSE FETCH FOR FUNCTION HTML IF INCR INFF ISEQUAL LACC LPAREN MINEQ MINUS NAME NOTEQUAL NUMBER OU PLUS PLUSEQ PRINT RACC RETURN RPAREN SCAN SEMI START STRING SUP TABLEID THEN TIMES TO TRUE WHILE and orstart : bloc bloc : bloc statement\n    | statementstatement : NAME EQUALS expression SEMI \n                 | NAME EQUALS expression \n                 | NAME EQUALS statement   statement : WHILE expression RACC bloc LACC  statement : FOR LPAREN statement TO NUMBER COMMA statement RPAREN RACC bloc LACC statement : expression\n                 | expression CONCAT statement\n                 | PRINT CONCAT statementstatement : COMMENTS statement : IF expression THEN statement\n                  | IF expression THEN RACC bloc LACC  \n                  | IF expression THEN RACC bloc LACC ELSEIF expression THEN RACC bloc LACC ELSE RACC bloc LACC \n                  | IF expression THEN RACC bloc LACC ELSE RACC bloc LACC \n                  | IF statement THEN RACC bloc LACC ELSE RACC bloc LACC \n                  | IF statement THEN statement\n    \n    statement : PRINT LPAREN expression RPAREN SEMI \n                 | PRINT STRING SEMI \n                 | PRINT LPAREN statement RPAREN SEMIprint_params : expression\n              | expression COMMA print_params \n               statement : PRINT LPAREN print_params  RPAREN SEMI params : NAME\n              | NAME COMMA params statement : expression INFF statement\n                  | expression SUP statement \n                  | expression and statement \n                  | expression or statement\n                  | expression SEMI statement : RETURN expression SEMI statement : FUNCTION NAME LPAREN RPAREN START bloc END \n                  | FUNCTION NAME LPAREN params RPAREN START bloc END  statement : NAME DOTE FETCH LPAREN RPAREN SEMI  statement : NAME DOTE HTML LPAREN RPAREN SEMI  statement : NAME DOTE TABLEID LPAREN STRING RPAREN SEMI  statement : NAME DOTE SCAN LPAREN RPAREN SEMI \n                  | NAME EQUALS NAME DOTE SCAN LPAREN RPAREN SEMI statement : params EQUALS param_call SEMI   statement : NAME LPAREN RPAREN SEMI \n                  | NAME LPAREN param_call RPAREN SEMIparam_call : expression\n                   | expression COMMA param_call statement : DEFINE NAME EQUALS expression SEMI expression : expression PLUS expression\n                  | expression MINUS expression\n                  | expression TIMES expression\n                  | expression DIVIDE expression\n                  | expression or expression\n                  | expression and expression\n                  | expression SUP expression\n                  | expression INFF expression\n                  | expression ISEQUAL expression\n                  | expression NOTEQUAL expression\n                  | expression ET expression\n                  | expression OU expression\n\n                   statement : NAME INCR SEMI \n                  | NAME DECR SEMI \n                  | NAME INCR \n                  | NAME DECR statement : NAME PLUSEQ NUMBER SEMI \n                  | NAME MINEQ NUMBER SEMI \n                  | NAME PLUSEQ NUMBER \n                  | NAME MINEQ NUMBER expression : MINUS expression expression : LPAREN expression RPARENexpression : NUMBER expression : STRING expression : NAMEexpression : TRUEexpression : FALSE'
    
_lr_action_items = {'NAME':([0,2,3,4,5,6,8,9,11,12,13,14,15,17,18,19,20,21,22,24,25,26,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,45,46,48,49,53,56,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,98,99,103,104,105,106,107,108,109,110,111,113,115,120,122,123,124,125,126,127,128,129,132,135,136,137,138,139,140,141,142,145,152,154,156,159,160,161,162,163,165,167,168,170,171,172,174,175,177,179,182,183,184,187,188,189,190,192,193,194,195,196,197,198,199,202,203,204,],[4,4,-3,-70,-9,45,45,-68,-12,53,-69,45,55,57,45,-71,-72,-2,59,45,-60,-61,73,4,4,4,4,4,-31,45,45,45,45,45,45,45,45,-70,4,4,53,-70,45,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,4,45,45,45,45,-67,-11,-20,4,53,53,53,53,4,-32,73,45,-4,-41,45,-62,-63,4,-50,-51,-52,-53,45,-13,4,-9,-9,-9,-9,-18,4,-40,-42,-7,-19,-21,-24,4,4,4,-45,-35,-36,-38,4,-14,4,4,-37,45,-33,4,-38,4,4,-34,4,4,4,4,4,-16,-17,-8,4,4,4,-15,]),'WHILE':([0,2,3,4,5,9,11,12,13,19,20,21,22,25,26,30,31,32,33,34,35,45,46,48,49,53,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,98,99,103,104,105,106,107,108,109,110,115,120,123,124,125,126,127,128,129,135,136,137,138,139,140,141,142,145,152,154,156,159,160,161,162,163,165,167,168,170,171,172,174,175,177,182,183,184,187,188,189,190,192,193,194,195,196,197,198,199,202,203,204,],[6,6,-3,-70,-9,-68,-12,6,-69,-71,-72,-2,6,-60,-61,6,6,6,6,6,-31,-70,6,6,6,-70,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,6,-67,-11,-20,6,6,6,6,6,6,-32,-4,-41,-62,-63,6,-50,-51,-52,-53,-13,6,-9,-9,-9,-9,-18,6,-40,-42,-7,-19,-21,-24,6,6,6,-45,-35,-36,-38,6,-14,6,6,-37,-33,6,-38,6,6,-34,6,6,6,6,6,-16,-17,-8,6,6,6,-15,]),'FOR':([0,2,3,4,5,9,11,12,13,19,20,21,22,25,26,30,31,32,33,34,35,45,46,48,49,53,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,98,99,103,104,105,106,107,108,109,110,115,120,123,124,125,126,127,128,129,135,136,137,138,139,140,141,142,145,152,154,156,159,160,161,162,163,165,167,168,170,171,172,174,175,177,182,183,184,187,188,189,190,192,193,194,195,196,197,198,199,202,203,204,],[7,7,-3,-70,-9,-68,-12,7,-69,-71,-72,-2,7,-60,-61,7,7,7,7,7,-31,-70,7,7,7,-70,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,7,-67,-11,-20,7,7,7,7,7,7,-32,-4,-41,-62,-63,7,-50,-51,-52,-53,-13,7,-9,-9,-9,-9,-18,7,-40,-42,-7,-19,-21,-24,7,7,7,-45,-35,-36,-38,7,-14,7,7,-37,-33,7,-38,7,7,-34,7,7,7,7,7,-16,-17,-8,7,7,7,-15,]),'PRINT':([0,2,3,4,5,9,11,12,13,19,20,21,22,25,26,30,31,32,33,34,35,45,46,48,49,53,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,98,99,103,104,105,106,107,108,109,110,115,120,123,124,125,126,127,128,129,135,136,137,138,139,140,141,142,145,152,154,156,159,160,161,162,163,165,167,168,170,171,172,174,175,177,182,183,184,187,188,189,190,192,193,194,195,196,197,198,199,202,203,204,],[10,10,-3,-70,-9,-68,-12,10,-69,-71,-72,-2,10,-60,-61,10,10,10,10,10,-31,-70,10,10,10,-70,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,10,-67,-11,-20,10,10,10,10,10,10,-32,-4,-41,-62,-63,10,-50,-51,-52,-53,-13,10,-9,-9,-9,-9,-18,10,-40,-42,-7,-19,-21,-24,10,10,10,-45,-35,-36,-38,10,-14,10,10,-37,-33,10,-38,10,10,-34,10,10,10,10,10,-16,-17,-8,10,10,10,-15,]),'COMMENTS':([0,2,3,4,5,9,11,12,13,19,20,21,22,25,26,30,31,32,33,34,35,45,46,48,49,53,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,98,99,103,104,105,106,107,108,109,110,115,120,123,124,125,126,127,128,129,135,136,137,138,139,140,141,142,145,152,154,156,159,160,161,162,163,165,167,168,170,171,172,174,175,177,182,183,184,187,188,189,190,192,193,194,195,196,197,198,199,202,203,204,],[11,11,-3,-70,-9,-68,-12,11,-69,-71,-72,-2,11,-60,-61,11,11,11,11,11,-31,-70,11,11,11,-70,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,11,-67,-11,-20,11,11,11,11,11,11,-32,-4,-41,-62,-63,11,-50,-51,-52,-53,-13,11,-9,-9,-9,-9,-18,11,-40,-42,-7,-19,-21,-24,11,11,11,-45,-35,-36,-38,11,-14,11,11,-37,-33,11,-38,11,11,-34,11,11,11,11,11,-16,-17,-8,11,11,11,-15,]),'IF':([0,2,3,4,5,9,11,12,13,19,20,21,22,25,26,30,31,32,33,34,35,45,46,48,49,53,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,98,99,103,104,105,106,107,108,109,110,115,120,123,124,125,126,127,128,129,135,136,137,138,139,140,141,142,145,152,154,156,159,160,161,162,163,165,167,168,170,171,172,174,175,177,182,183,184,187,188,189,190,192,193,194,195,196,197,198,199,202,203,204,],[12,12,-3,-70,-9,-68,-12,12,-69,-71,-72,-2,12,-60,-61,12,12,12,12,12,-31,-70,12,12,12,-70,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,12,-67,-11,-20,12,12,12,12,12,12,-32,-4,-41,-62,-63,12,-50,-51,-52,-53,-13,12,-9,-9,-9,-9,-18,12,-40,-42,-7,-19,-21,-24,12,12,12,-45,-35,-36,-38,12,-14,12,12,-37,-33,12,-38,12,12,-34,12,12,12,12,12,-16,-17,-8,12,12,12,-15,]),'RETURN':([0,2,3,4,5,9,11,12,13,19,20,21,22,25,26,30,31,32,33,34,35,45,46,48,49,53,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,98,99,103,104,105,106,107,108,109,110,115,120,123,124,125,126,127,128,129,135,136,137,138,139,140,141,142,145,152,154,156,159,160,161,162,163,165,167,168,170,171,172,174,175,177,182,183,184,187,188,189,190,192,193,194,195,196,197,198,199,202,203,204,],[14,14,-3,-70,-9,-68,-12,14,-69,-71,-72,-2,14,-60,-61,14,14,14,14,14,-31,-70,14,14,14,-70,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,14,-67,-11,-20,14,14,14,14,14,14,-32,-4,-41,-62,-63,14,-50,-51,-52,-53,-13,14,-9,-9,-9,-9,-18,14,-40,-42,-7,-19,-21,-24,14,14,14,-45,-35,-36,-38,14,-14,14,14,-37,-33,14,-38,14,14,-34,14,14,14,14,14,-16,-17,-8,14,14,14,-15,]),'FUNCTION':([0,2,3,4,5,9,11,12,13,19,20,21,22,25,26,30,31,32,33,34,35,45,46,48,49,53,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,98,99,103,104,105,106,107,108,109,110,115,120,123,124,125,126,127,128,129,135,136,137,138,139,140,141,142,145,152,154,156,159,160,161,162,163,165,167,168,170,171,172,174,175,177,182,183,184,187,188,189,190,192,193,194,195,196,197,198,199,202,203,204,],[15,15,-3,-70,-9,-68,-12,15,-69,-71,-72,-2,15,-60,-61,15,15,15,15,15,-31,-70,15,15,15,-70,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,15,-67,-11,-20,15,15,15,15,15,15,-32,-4,-41,-62,-63,15,-50,-51,-52,-53,-13,15,-9,-9,-9,-9,-18,15,-40,-42,-7,-19,-21,-24,15,15,15,-45,-35,-36,-38,15,-14,15,15,-37,-33,15,-38,15,15,-34,15,15,15,15,15,-16,-17,-8,15,15,15,-15,]),'DEFINE':([0,2,3,4,5,9,11,12,13,19,20,21,22,25,26,30,31,32,33,34,35,45,46,48,49,53,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,98,99,103,104,105,106,107,108,109,110,115,120,123,124,125,126,127,128,129,135,136,137,138,139,140,141,142,145,152,154,156,159,160,161,162,163,165,167,168,170,171,172,174,175,177,182,183,184,187,188,189,190,192,193,194,195,196,197,198,199,202,203,204,],[17,17,-3,-70,-9,-68,-12,17,-69,-71,-72,-2,17,-60,-61,17,17,17,17,17,-31,-70,17,17,17,-70,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,17,-67,-11,-20,17,17,17,17,17,17,-32,-4,-41,-62,-63,17,-50,-51,-52,-53,-13,17,-9,-9,-9,-9,-18,17,-40,-42,-7,-19,-21,-24,17,17,17,-45,-35,-36,-38,17,-14,17,17,-37,-33,17,-38,17,17,-34,17,17,17,17,17,-16,-17,-8,17,17,17,-15,]),'MINUS':([0,2,3,4,5,6,8,9,11,12,13,14,18,19,20,21,22,24,25,26,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,51,53,54,56,58,59,60,61,68,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,98,99,100,103,104,105,106,107,108,109,110,113,115,120,122,123,124,125,126,127,128,129,132,135,136,137,138,139,140,141,142,145,146,152,154,156,157,159,160,161,162,163,165,167,168,170,171,172,174,175,177,179,182,183,184,186,187,188,189,190,192,193,194,195,196,197,198,199,202,203,204,],[18,18,-3,-70,37,18,18,-68,-12,18,-69,18,18,-71,-72,-2,18,18,-60,-61,18,18,18,18,18,-31,18,18,18,18,18,18,18,18,37,-70,18,37,18,18,37,-70,37,18,-66,-70,37,-6,37,-58,-59,-64,-65,-10,37,-27,37,-28,37,-29,37,-30,-46,-47,-48,-49,37,37,37,37,18,18,18,18,18,-67,-11,37,-20,18,18,18,18,18,18,-32,18,-4,-41,18,-62,-63,18,37,37,37,37,18,-13,18,37,37,37,37,-18,18,-40,37,-42,-7,-19,37,-21,-24,18,18,18,-45,-35,-36,-38,18,-14,18,18,-37,18,-33,18,-38,37,18,18,-34,18,18,18,18,18,-16,-17,-8,18,18,18,-15,]),'LPAREN':([0,2,3,4,5,6,7,8,9,10,11,12,13,14,18,19,20,21,22,24,25,26,30,31,32,33,34,35,36,37,38,39,40,41,42,43,45,46,48,49,53,55,56,58,59,60,61,62,63,64,65,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,98,99,103,104,105,106,107,108,109,110,113,115,120,122,123,124,125,126,127,128,129,132,135,136,137,138,139,140,141,142,145,147,152,154,156,159,160,161,162,163,165,167,168,170,171,172,174,175,177,179,182,183,184,187,188,189,190,192,193,194,195,196,197,198,199,202,203,204,],[8,8,-3,24,-9,8,46,8,-68,49,-12,8,-69,8,8,-71,-72,-2,8,8,-60,-61,8,8,8,8,8,-31,8,8,8,8,8,8,8,8,-70,8,8,8,24,111,8,-66,24,-5,-6,116,117,118,119,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,8,8,8,8,8,-67,-11,-20,8,8,8,8,8,8,-32,8,-4,-41,8,-62,-63,8,-50,-51,-52,-53,8,-13,8,-9,-9,-9,-9,-18,8,-40,166,-42,-7,-19,-21,-24,8,8,8,-45,-35,-36,-38,8,-14,8,8,-37,8,-33,8,-38,8,8,-34,8,8,8,8,8,-16,-17,-8,8,8,8,-15,]),'NUMBER':([0,2,3,4,5,6,8,9,11,12,13,14,18,19,20,21,22,24,25,26,27,28,30,31,32,33,34,35,36,37,38,39,40,41,42,43,45,46,48,49,53,56,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,98,99,103,104,105,106,107,108,109,110,113,115,120,122,123,124,125,126,127,128,129,130,132,135,136,137,138,139,140,141,142,145,152,154,156,159,160,161,162,163,165,167,168,170,171,172,174,175,177,179,182,183,184,187,188,189,190,192,193,194,195,196,197,198,199,202,203,204,],[9,9,-3,-70,-9,9,9,-68,-12,9,-69,9,9,-71,-72,-2,9,9,-60,-61,71,72,9,9,9,9,9,-31,9,9,9,9,9,9,9,9,-70,9,9,9,-70,9,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,9,9,9,9,9,-67,-11,-20,9,9,9,9,9,9,-32,9,-4,-41,9,-62,-63,9,-50,-51,-52,-53,155,9,-13,9,-9,-9,-9,-9,-18,9,-40,-42,-7,-19,-21,-24,9,9,9,-45,-35,-36,-38,9,-14,9,9,-37,9,-33,9,-38,9,9,-34,9,9,9,9,9,-16,-17,-8,9,9,9,-15,]),'STRING':([0,2,3,4,5,6,8,9,10,11,12,13,14,18,19,20,21,22,24,25,26,30,31,32,33,34,35,36,37,38,39,40,41,42,43,45,46,48,49,53,56,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,98,99,103,104,105,106,107,108,109,110,113,115,118,120,122,123,124,125,126,127,128,129,132,135,136,137,138,139,140,141,142,145,152,154,156,159,160,161,162,163,165,167,168,170,171,172,174,175,177,179,182,183,184,187,188,189,190,192,193,194,195,196,197,198,199,202,203,204,],[13,13,-3,-70,-9,13,13,-68,50,-12,13,-69,13,13,-71,-72,-2,13,13,-60,-61,13,13,13,13,13,-31,13,13,13,13,13,13,13,13,-70,13,13,13,-70,13,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,13,13,13,13,13,-67,-11,-20,13,13,13,13,13,13,-32,13,-4,150,-41,13,-62,-63,13,-50,-51,-52,-53,13,-13,13,-9,-9,-9,-9,-18,13,-40,-42,-7,-19,-21,-24,13,13,13,-45,-35,-36,-38,13,-14,13,13,-37,13,-33,13,-38,13,13,-34,13,13,13,13,13,-16,-17,-8,13,13,13,-15,]),'TRUE':([0,2,3,4,5,6,8,9,11,12,13,14,18,19,20,21,22,24,25,26,30,31,32,33,34,35,36,37,38,39,40,41,42,43,45,46,48,49,53,56,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,98,99,103,104,105,106,107,108,109,110,113,115,120,122,123,124,125,126,127,128,129,132,135,136,137,138,139,140,141,142,145,152,154,156,159,160,161,162,163,165,167,168,170,171,172,174,175,177,179,182,183,184,187,188,189,190,192,193,194,195,196,197,198,199,202,203,204,],[19,19,-3,-70,-9,19,19,-68,-12,19,-69,19,19,-71,-72,-2,19,19,-60,-61,19,19,19,19,19,-31,19,19,19,19,19,19,19,19,-70,19,19,19,-70,19,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,19,19,19,19,19,-67,-11,-20,19,19,19,19,19,19,-32,19,-4,-41,19,-62,-63,19,-50,-51,-52,-53,19,-13,19,-9,-9,-9,-9,-18,19,-40,-42,-7,-19,-21,-24,19,19,19,-45,-35,-36,-38,19,-14,19,19,-37,19,-33,19,-38,19,19,-34,19,19,19,19,19,-16,-17,-8,19,19,19,-15,]),'FALSE':([0,2,3,4,5,6,8,9,11,12,13,14,18,19,20,21,22,24,25,26,30,31,32,33,34,35,36,37,38,39,40,41,42,43,45,46,48,49,53,56,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,98,99,103,104,105,106,107,108,109,110,113,115,120,122,123,124,125,126,127,128,129,132,135,136,137,138,139,140,141,142,145,152,154,156,159,160,161,162,163,165,167,168,170,171,172,174,175,177,179,182,183,184,187,188,189,190,192,193,194,195,196,197,198,199,202,203,204,],[20,20,-3,-70,-9,20,20,-68,-12,20,-69,20,20,-71,-72,-2,20,20,-60,-61,20,20,20,20,20,-31,20,20,20,20,20,20,20,20,-70,20,20,20,-70,20,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,20,20,20,20,20,-67,-11,-20,20,20,20,20,20,20,-32,20,-4,-41,20,-62,-63,20,-50,-51,-52,-53,20,-13,20,-9,-9,-9,-9,-18,20,-40,-42,-7,-19,-21,-24,20,20,20,-45,-35,-36,-38,20,-14,20,20,-37,20,-33,20,-38,20,20,-34,20,20,20,20,20,-16,-17,-8,20,20,20,-15,]),'$end':([1,2,3,4,5,9,11,13,19,20,21,25,26,35,45,53,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,98,99,103,110,115,120,123,124,126,127,128,129,135,137,138,139,140,141,145,152,154,156,159,160,165,167,168,170,172,177,182,184,189,196,197,198,204,],[0,-1,-3,-70,-9,-68,-12,-69,-71,-72,-2,-60,-61,-31,-70,-70,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,-67,-11,-20,-32,-4,-41,-62,-63,-50,-51,-52,-53,-13,-9,-9,-9,-9,-18,-40,-42,-7,-19,-21,-24,-45,-35,-36,-38,-14,-37,-33,-38,-34,-16,-17,-8,-15,]),'LACC':([3,4,5,9,11,13,19,20,21,25,26,35,45,53,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,98,99,103,110,115,120,123,124,125,126,127,128,129,135,137,138,139,140,141,145,152,154,156,159,160,161,162,165,167,168,170,172,177,182,184,189,192,193,194,196,197,198,199,203,204,],[-3,-70,-9,-68,-12,-69,-71,-72,-2,-60,-61,-31,-70,-70,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,-67,-11,-20,-32,-4,-41,-62,-63,154,-50,-51,-52,-53,-13,-9,-9,-9,-9,-18,-40,-42,-7,-19,-21,-24,172,173,-45,-35,-36,-38,-14,-37,-33,-38,-34,196,197,198,-16,-17,-8,200,204,-15,]),'END':([3,4,5,9,11,13,19,20,21,25,26,35,45,53,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,98,99,103,110,115,120,123,124,126,127,128,129,135,137,138,139,140,141,145,152,154,156,159,160,165,167,168,170,172,174,177,182,183,184,189,196,197,198,204,],[-3,-70,-9,-68,-12,-69,-71,-72,-2,-60,-61,-31,-70,-70,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,-67,-11,-20,-32,-4,-41,-62,-63,-50,-51,-52,-53,-13,-9,-9,-9,-9,-18,-40,-42,-7,-19,-21,-24,-45,-35,-36,-38,-14,182,-37,-33,189,-38,-34,-16,-17,-8,-15,]),'EQUALS':([4,16,53,57,59,73,74,],[22,56,22,113,22,-25,-26,]),'DOTE':([4,53,59,],[23,23,114,]),'INCR':([4,53,59,],[25,25,25,]),'DECR':([4,53,59,],[26,26,26,]),'PLUSEQ':([4,53,59,],[27,27,27,]),'MINEQ':([4,53,59,],[28,28,28,]),'CONCAT':([4,5,9,10,13,19,20,45,51,53,58,59,60,76,78,80,82,84,85,86,87,88,89,90,91,98,100,126,127,128,129,137,138,139,140,],[-70,30,-68,48,-69,-71,-72,-70,30,-70,-66,-70,30,30,-52,-51,-50,-46,-47,-48,-49,-54,-55,-56,-57,-67,30,-50,-51,-52,-53,-50,-51,-52,30,]),'INFF':([4,5,9,13,19,20,44,45,47,51,53,54,58,59,60,68,76,78,80,82,84,85,86,87,88,89,90,91,98,100,126,127,128,129,137,138,139,140,146,157,186,],[-70,31,-68,-69,-71,-72,96,-70,96,108,-70,96,-66,-70,108,96,31,-52,-51,-50,-46,-47,-48,-49,96,96,96,96,-67,108,-50,-51,-52,96,-50,-51,-52,108,96,96,96,]),'SUP':([4,5,9,13,19,20,44,45,47,51,53,54,58,59,60,68,76,78,80,82,84,85,86,87,88,89,90,91,98,100,126,127,128,129,137,138,139,140,146,157,186,],[-70,32,-68,-69,-71,-72,95,-70,95,107,-70,95,-66,-70,107,95,32,32,32,32,-46,-47,-48,-49,95,95,95,95,-67,107,95,95,None,95,107,107,107,107,95,95,95,]),'and':([4,5,9,13,19,20,44,45,47,51,53,54,58,59,60,68,76,78,80,82,84,85,86,87,88,89,90,91,98,100,126,127,128,129,137,138,139,140,146,157,186,],[-70,33,-68,-69,-71,-72,94,-70,94,106,-70,94,-66,-70,106,94,33,-52,-51,33,-46,-47,-48,-49,94,94,94,94,-67,106,94,-51,-52,94,106,-51,-52,106,94,94,94,]),'or':([4,5,9,13,19,20,44,45,47,51,53,54,58,59,60,68,76,78,80,82,84,85,86,87,88,89,90,91,98,100,126,127,128,129,137,138,139,140,146,157,186,],[-70,34,-68,-69,-71,-72,93,-70,93,105,-70,93,-66,-70,105,93,34,-52,-51,-50,-46,-47,-48,-49,93,93,93,93,-67,105,-50,-51,-52,93,-50,-51,-52,105,93,93,93,]),'SEMI':([4,5,9,13,19,20,25,26,45,50,51,53,54,58,59,60,66,68,71,72,76,78,80,82,84,85,86,87,88,89,90,91,98,100,112,121,126,127,128,129,131,133,134,137,138,139,140,146,148,149,151,153,169,176,],[-70,35,-68,-69,-71,-72,69,70,-70,103,35,-70,110,-66,-70,115,120,-43,123,124,35,-52,-51,-50,-46,-47,-48,-49,-54,-55,-56,-57,-67,35,145,152,-50,-51,-52,-53,156,159,160,-50,-51,-52,35,165,167,168,170,-44,177,184,]),'PLUS':([4,5,9,13,19,20,44,45,47,51,53,54,58,59,60,68,76,78,80,82,84,85,86,87,88,89,90,91,98,100,126,127,128,129,137,138,139,140,146,157,186,],[-70,36,-68,-69,-71,-72,36,-70,36,36,-70,36,-66,-70,36,36,36,36,36,36,-46,-47,-48,-49,36,36,36,36,-67,36,36,36,36,36,36,36,36,36,36,36,36,]),'TIMES':([4,5,9,13,19,20,44,45,47,51,53,54,58,59,60,68,76,78,80,82,84,85,86,87,88,89,90,91,98,100,126,127,128,129,137,138,139,140,146,157,186,],[-70,38,-68,-69,-71,-72,38,-70,38,38,-70,38,38,-70,38,38,38,38,38,38,38,38,-48,-49,38,38,38,38,-67,38,38,38,38,38,38,38,38,38,38,38,38,]),'DIVIDE':([4,5,9,13,19,20,44,45,47,51,53,54,58,59,60,68,76,78,80,82,84,85,86,87,88,89,90,91,98,100,126,127,128,129,137,138,139,140,146,157,186,],[-70,39,-68,-69,-71,-72,39,-70,39,39,-70,39,39,-70,39,39,39,39,39,39,39,39,-48,-49,39,39,39,39,-67,39,39,39,39,39,39,39,39,39,39,39,39,]),'ISEQUAL':([4,5,9,13,19,20,44,45,47,51,53,54,58,59,60,68,76,78,80,82,84,85,86,87,88,89,90,91,98,100,126,127,128,129,137,138,139,140,146,157,186,],[-70,40,-68,-69,-71,-72,40,-70,40,40,-70,40,-66,-70,40,40,40,-52,-51,-50,-46,-47,-48,-49,40,40,40,40,-67,40,-50,-51,-52,40,-50,-51,-52,40,40,40,40,]),'NOTEQUAL':([4,5,9,13,19,20,44,45,47,51,53,54,58,59,60,68,76,78,80,82,84,85,86,87,88,89,90,91,98,100,126,127,128,129,137,138,139,140,146,157,186,],[-70,41,-68,-69,-71,-72,41,-70,41,41,-70,41,-66,-70,41,41,41,-52,-51,-50,-46,-47,-48,-49,41,41,41,41,-67,41,-50,-51,-52,41,-50,-51,-52,41,41,41,41,]),'ET':([4,5,9,13,19,20,44,45,47,51,53,54,58,59,60,68,76,78,80,82,84,85,86,87,88,89,90,91,98,100,126,127,128,129,137,138,139,140,146,157,186,],[-70,42,-68,-69,-71,-72,42,-70,42,42,-70,42,-66,-70,42,42,42,-52,-51,-50,-46,-47,-48,-49,42,42,42,42,-67,42,-50,-51,-52,42,-50,-51,-52,42,42,42,42,]),'OU':([4,5,9,13,19,20,44,45,47,51,53,54,58,59,60,68,76,78,80,82,84,85,86,87,88,89,90,91,98,100,126,127,128,129,137,138,139,140,146,157,186,],[-70,43,-68,-69,-71,-72,43,-70,43,43,-70,43,-66,-70,43,43,43,-52,-51,-50,-46,-47,-48,-49,43,43,43,43,-67,43,-50,-51,-52,43,-50,-51,-52,43,43,43,43,]),'THEN':([4,5,9,11,13,19,20,25,26,35,45,51,52,53,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,98,99,103,110,115,120,123,124,126,127,128,129,135,137,138,139,140,141,145,152,154,156,159,160,165,167,168,170,172,177,182,184,186,189,196,197,198,204,],[-70,-9,-68,-12,-69,-71,-72,-60,-61,-31,-70,104,109,-70,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,-67,-11,-20,-32,-4,-41,-62,-63,-50,-51,-52,-53,-13,-9,-9,-9,-9,-18,-40,-42,-7,-19,-21,-24,-45,-35,-36,-38,-14,-37,-33,-38,191,-34,-16,-17,-8,-15,]),'TO':([4,5,9,11,13,19,20,25,26,35,45,53,58,59,60,61,69,70,71,72,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,97,98,99,103,110,115,120,123,124,126,127,128,129,135,137,138,139,140,141,145,152,154,156,159,160,165,167,168,170,172,177,182,184,189,196,197,198,204,],[-70,-9,-68,-12,-69,-71,-72,-60,-61,-31,-70,-70,-66,-70,-5,-6,-58,-59,-64,-65,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,130,-67,-11,-20,-32,-4,-41,-62,-63,-50,-51,-52,-53,-13,-9,-9,-9,-9,-18,-40,-42,-7,-19,-21,-24,-45,-35,-36,-38,-14,-37,-33,-38,-34,-16,-17,-8,-15,]),'RPAREN':([4,5,9,11,13,19,20,24,25,26,35,45,47,53,58,59,60,61,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,98,99,100,101,102,103,110,111,115,116,117,119,120,123,124,126,127,128,129,135,137,138,139,140,141,144,145,150,152,153,154,156,157,158,159,160,165,166,167,168,170,172,177,178,182,184,189,196,197,198,204,],[-70,-9,-68,-12,-69,-71,-72,66,-60,-61,-31,-70,98,-70,-66,-70,-5,-6,121,-43,-58,-59,-64,-65,-25,-26,-10,-9,-27,-9,-28,-9,-29,-9,-30,-46,-47,-48,-49,-54,-55,-56,-57,-67,-11,131,133,134,-20,-32,143,-4,148,149,151,-41,-62,-63,-50,-51,-52,-53,-13,-9,-9,-9,-9,-18,164,-40,169,-42,-44,-7,-19,-22,-23,-21,-24,-45,176,-35,-36,-38,-14,-37,185,-33,-38,-34,-16,-17,-8,-15,]),'COMMA':([4,9,13,19,20,45,53,58,59,68,73,84,85,86,87,88,89,90,91,98,100,126,127,128,129,137,138,139,140,155,157,],[29,-68,-69,-71,-72,-70,29,-66,29,122,29,-46,-47,-48,-49,-54,-55,-56,-57,-67,132,-50,-51,-52,-53,-50,-51,-52,-53,171,132,]),'RACC':([9,13,19,20,44,45,58,84,85,86,87,88,89,90,91,98,104,109,126,127,128,129,180,181,185,191,201,],[-68,-69,-71,-72,92,-70,-66,-46,-47,-48,-49,-54,-55,-56,-57,-67,136,142,-50,-51,-52,-53,187,188,190,195,202,]),'FETCH':([23,114,],[62,62,]),'HTML':([23,114,],[63,63,]),'TABLEID':([23,114,],[64,64,]),'SCAN':([23,114,],[65,147,]),'START':([143,164,],[163,175,]),'ELSEIF':([172,],[179,]),'ELSE':([172,173,200,],[180,181,201,]),}

_lr_action = {}
for _k, _v in _lr_action_items.items():
   for _x,_y in zip(_v[0],_v[1]):
      if not _x in _lr_action:  _lr_action[_x] = {}
      _lr_action[_x][_k] = _y
del _lr_action_items

_lr_goto_items = {'start':([0,],[1,]),'bloc':([0,92,136,142,163,175,187,188,190,195,202,],[2,125,161,162,174,183,192,193,194,199,203,]),'statement':([0,2,12,22,30,31,32,33,34,46,48,49,92,104,105,106,107,108,109,125,136,142,161,162,163,171,174,175,183,187,188,190,192,193,194,195,199,202,203,],[3,21,52,61,75,77,79,81,83,97,99,101,3,135,83,81,79,77,141,21,3,3,21,21,3,178,21,3,21,3,3,3,21,21,21,3,21,3,21,]),'expression':([0,2,6,8,12,14,18,22,24,30,31,32,33,34,36,37,38,39,40,41,42,43,46,48,49,56,92,93,94,95,96,104,105,106,107,108,109,113,122,125,132,136,142,161,162,163,171,174,175,179,183,187,188,190,192,193,194,195,199,202,203,],[5,5,44,47,51,54,58,60,68,5,76,78,80,82,84,85,86,87,88,89,90,91,5,5,100,68,5,126,127,128,129,5,137,138,139,140,5,146,68,5,157,5,5,5,5,5,5,5,5,186,5,5,5,5,5,5,5,5,5,5,5,]),'params':([0,2,12,22,29,30,31,32,33,34,46,48,49,92,104,105,106,107,108,109,111,125,136,142,161,162,163,171,174,175,183,187,188,190,192,193,194,195,199,202,203,],[16,16,16,16,74,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,144,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,]),'param_call':([24,56,122,],[67,112,153,]),'print_params':([49,132,],[102,158,]),}

_lr_goto = {}
for _k, _v in _lr_goto_items.items():
   for _x, _y in zip(_v[0], _v[1]):
       if not _x in _lr_goto: _lr_goto[_x] = {}
       _lr_goto[_x][_k] = _y
del _lr_goto_items
_lr_productions = [
  ("S' -> start","S'",1,None,None,None),
  ('start -> bloc','start',1,'p_start','parse.py',7),
  ('bloc -> bloc statement','bloc',2,'p_bloc','parse.py',13),
  ('bloc -> statement','bloc',1,'p_bloc','parse.py',14),
  ('statement -> NAME EQUALS expression SEMI','statement',4,'p_statement_assign','parse.py',23),
  ('statement -> NAME EQUALS expression','statement',3,'p_statement_assign','parse.py',24),
  ('statement -> NAME EQUALS statement','statement',3,'p_statement_assign','parse.py',25),
  ('statement -> WHILE expression RACC bloc LACC','statement',5,'p_while_statement','parse.py',32),
  ('statement -> FOR LPAREN statement TO NUMBER COMMA statement RPAREN RACC bloc LACC','statement',11,'p_for_loop','parse.py',36),
  ('statement -> expression','statement',1,'p_eval_concatenation','parse.py',41),
  ('statement -> expression CONCAT statement','statement',3,'p_eval_concatenation','parse.py',42),
  ('statement -> PRINT CONCAT statement','statement',3,'p_eval_concatenation','parse.py',43),
  ('statement -> COMMENTS','statement',1,'p_statement_comment','parse.py',51),
  ('statement -> IF expression THEN statement','statement',4,'p_if_els_statement','parse.py',55),
  ('statement -> IF expression THEN RACC bloc LACC','statement',6,'p_if_els_statement','parse.py',56),
  ('statement -> IF expression THEN RACC bloc LACC ELSEIF expression THEN RACC bloc LACC ELSE RACC bloc LACC','statement',16,'p_if_els_statement','parse.py',57),
  ('statement -> IF expression THEN RACC bloc LACC ELSE RACC bloc LACC','statement',10,'p_if_els_statement','parse.py',58),
  ('statement -> IF statement THEN RACC bloc LACC ELSE RACC bloc LACC','statement',10,'p_if_els_statement','parse.py',59),
  ('statement -> IF statement THEN statement','statement',4,'p_if_els_statement','parse.py',60),
  ('statement -> PRINT LPAREN expression RPAREN SEMI','statement',5,'p_statement_print','parse.py',69),
  ('statement -> PRINT STRING SEMI','statement',3,'p_statement_print','parse.py',70),
  ('statement -> PRINT LPAREN statement RPAREN SEMI','statement',5,'p_statement_print','parse.py',71),
  ('print_params -> expression','print_params',1,'p_print_prams','parse.py',80),
  ('print_params -> expression COMMA print_params','print_params',3,'p_print_prams','parse.py',81),
  ('statement -> PRINT LPAREN print_params RPAREN SEMI','statement',5,'p_multi_print','parse.py',91),
  ('params -> NAME','params',1,'p_parameters','parse.py',96),
  ('params -> NAME COMMA params','params',3,'p_parameters','parse.py',97),
  ('statement -> expression INFF statement','statement',3,'p_multi_compare','parse.py',105),
  ('statement -> expression SUP statement','statement',3,'p_multi_compare','parse.py',106),
  ('statement -> expression and statement','statement',3,'p_multi_compare','parse.py',107),
  ('statement -> expression or statement','statement',3,'p_multi_compare','parse.py',108),
  ('statement -> expression SEMI','statement',2,'p_multi_compare','parse.py',109),
  ('statement -> RETURN expression SEMI','statement',3,'p_return_statamene','parse.py',118),
  ('statement -> FUNCTION NAME LPAREN RPAREN START bloc END','statement',7,'p_function','parse.py',123),
  ('statement -> FUNCTION NAME LPAREN params RPAREN START bloc END','statement',8,'p_function','parse.py',124),
  ('statement -> NAME DOTE FETCH LPAREN RPAREN SEMI','statement',6,'p_fetch_table','parse.py',134),
  ('statement -> NAME DOTE HTML LPAREN RPAREN SEMI','statement',6,'p_is_html','parse.py',138),
  ('statement -> NAME DOTE TABLEID LPAREN STRING RPAREN SEMI','statement',7,'p_get_table_by_id','parse.py',143),
  ('statement -> NAME DOTE SCAN LPAREN RPAREN SEMI','statement',6,'p_scan','parse.py',147),
  ('statement -> NAME EQUALS NAME DOTE SCAN LPAREN RPAREN SEMI','statement',8,'p_scan','parse.py',148),
  ('statement -> params EQUALS param_call SEMI','statement',4,'p_multi_assigne','parse.py',152),
  ('statement -> NAME LPAREN RPAREN SEMI','statement',4,'p_function_call','parse.py',158),
  ('statement -> NAME LPAREN param_call RPAREN SEMI','statement',5,'p_function_call','parse.py',159),
  ('param_call -> expression','param_call',1,'p_expressions','parse.py',166),
  ('param_call -> expression COMMA param_call','param_call',3,'p_expressions','parse.py',167),
  ('statement -> DEFINE NAME EQUALS expression SEMI','statement',5,'p_global_variables','parse.py',176),
  ('expression -> expression PLUS expression','expression',3,'p_expression_binop','parse.py',182),
  ('expression -> expression MINUS expression','expression',3,'p_expression_binop','parse.py',183),
  ('expression -> expression TIMES expression','expression',3,'p_expression_binop','parse.py',184),
  ('expression -> expression DIVIDE expression','expression',3,'p_expression_binop','parse.py',185),
  ('expression -> expression or expression','expression',3,'p_expression_binop','parse.py',186),
  ('expression -> expression and expression','expression',3,'p_expression_binop','parse.py',187),
  ('expression -> expression SUP expression','expression',3,'p_expression_binop','parse.py',188),
  ('expression -> expression INFF expression','expression',3,'p_expression_binop','parse.py',189),
  ('expression -> expression ISEQUAL expression','expression',3,'p_expression_binop','parse.py',190),
  ('expression -> expression NOTEQUAL expression','expression',3,'p_expression_binop','parse.py',191),
  ('expression -> expression ET expression','expression',3,'p_expression_binop','parse.py',192),
  ('expression -> expression OU expression','expression',3,'p_expression_binop','parse.py',193),
  ('statement -> NAME INCR SEMI','statement',3,'p_incr_decr','parse.py',200),
  ('statement -> NAME DECR SEMI','statement',3,'p_incr_decr','parse.py',201),
  ('statement -> NAME INCR','statement',2,'p_incr_decr','parse.py',202),
  ('statement -> NAME DECR','statement',2,'p_incr_decr','parse.py',203),
  ('statement -> NAME PLUSEQ NUMBER SEMI','statement',4,'p_plus_min_eq','parse.py',213),
  ('statement -> NAME MINEQ NUMBER SEMI','statement',4,'p_plus_min_eq','parse.py',214),
  ('statement -> NAME PLUSEQ NUMBER','statement',3,'p_plus_min_eq','parse.py',215),
  ('statement -> NAME MINEQ NUMBER','statement',3,'p_plus_min_eq','parse.py',216),
  ('expression -> MINUS expression','expression',2,'p_expression_uminus','parse.py',224),
  ('expression -> LPAREN expression RPAREN','expression',3,'p_expression_group','parse.py',228),
  ('expression -> NUMBER','expression',1,'p_expression_number','parse.py',232),
  ('expression -> STRING','expression',1,'p_expression_str','parse.py',236),
  ('expression -> NAME','expression',1,'p_expression_name','parse.py',240),
  ('expression -> TRUE','expression',1,'p_expression_true','parse.py',248),
  ('expression -> FALSE','expression',1,'p_expression_false','parse.py',253),
]
