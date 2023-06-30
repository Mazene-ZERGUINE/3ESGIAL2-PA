
# parsetab.py
# This file is automatically generated. Do not edit.
# pylint: disable=W,C,R
_tabversion = '3.10'

_lr_method = 'LALR'

_lr_signature = 'leftorleftandnonassocEQUALSSUPleftPLUSMINUSleftTIMESDIVIDECOMMA COMMENT COMMENTS DECR DEFINE DIVIDE ELSE ELSEIF END EQUALS ET FOR FUNCTION IF INCR INFF ISEQUAL LACC LPAREN MINEQ MINUS NAME NOTEQUAL NUMBER OU PLUS PLUSEQ PRINT RACC RETURN RPAREN SEMI START STRING SUP THEN TIMES TO WHILE and orstart : bloc bloc : bloc statement\n    | statementstatement : NAME EQUALS expression SEMI \n                 | NAME EQUALS expression  statement : WHILE expression RACC bloc LACC  statement : FOR LPAREN statement TO NUMBER COMMA statement RPAREN RACC bloc LACC statement : COMMENTS statement : IF expression THEN statement\n                  | IF expression THEN RACC bloc LACC  \n                  | IF expression THEN RACC bloc LACC ELSEIF expression THEN RACC bloc LACC ELSE RACC bloc LACC \n                  | IF expression THEN RACC bloc LACC ELSE RACC bloc LACC \n    \n    statement : PRINT LPAREN expression RPAREN SEMI \n                 | PRINT STRING SEMIprint_params : expression\n              | expression COMMA print_params \n               statement : PRINT LPAREN print_params  RPAREN SEMI params : NAME\n              | NAME COMMA params statement : expression INFF statement\n                  | expression SUP statement \n                  | expression and statement \n                  | expression or statement\n                  | expression SEMI statement : RETURN expression SEMI statement : FUNCTION NAME LPAREN RPAREN START bloc END \n                  | FUNCTION NAME LPAREN params RPAREN START bloc END  statement : params EQUALS param_call SEMI   statement : NAME LPAREN RPAREN SEMI \n                  | NAME LPAREN param_call RPAREN SEMIparam_call : expression\n                   | expression COMMA param_call statement : DEFINE NAME EQUALS expression SEMI expression : expression PLUS expression\n                  | expression MINUS expression\n                  | expression TIMES expression\n                  | expression DIVIDE expression\n                  | expression or expression\n                  | expression and expression\n                  | expression SUP expression\n                  | expression INFF expression\n                  | expression ISEQUAL expression\n                  | expression NOTEQUAL expression\n                  | expression ET expression\n                  | expression OU expression\n\n                   statement : NAME INCR SEMI \n                  | NAME DECR SEMI \n                  | NAME INCR \n                  | NAME DECR statement : NAME PLUSEQ NUMBER SEMI \n                  | NAME MINEQ NUMBER SEMI \n                  | NAME PLUSEQ NUMBER \n                  | NAME MINEQ NUMBER expression : MINUS expression expression : LPAREN expression RPARENexpression : NUMBER expression : STRING expression : NAME'
    
_lr_action_items = {'NAME':([0,2,3,6,8,9,10,11,13,14,15,17,18,19,20,21,22,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,41,42,45,49,51,52,56,57,58,59,63,65,67,69,70,71,72,73,74,75,76,77,78,79,80,81,82,84,85,88,89,90,92,93,94,96,97,98,99,100,101,102,103,105,106,108,112,114,116,118,119,122,123,125,126,127,128,129,131,133,134,137,138,139,141,142,143,144,145,146,149,150,151,],[4,4,-3,41,41,-56,-8,41,-57,41,48,50,41,-2,41,41,-48,-49,60,4,4,4,4,-24,41,41,41,41,41,41,41,41,-58,4,41,41,-54,-5,-46,-47,-52,-53,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,4,41,41,41,41,-55,4,-14,-25,60,41,-4,-29,41,-50,-51,4,-38,-39,-40,-41,-9,4,41,-28,-30,-6,4,-13,-17,4,-33,4,-10,4,4,41,-26,4,4,-27,4,4,4,4,-12,-7,4,4,4,-11,]),'WHILE':([0,2,3,9,10,13,19,22,23,27,28,29,30,31,41,42,51,52,56,57,58,59,63,65,67,69,70,71,72,73,74,75,76,77,78,84,85,88,89,93,94,97,98,99,100,101,102,103,105,106,112,114,116,118,119,122,123,125,126,127,128,129,133,134,137,138,139,141,142,143,144,145,146,149,150,151,],[6,6,-3,-56,-8,-57,-2,-48,-49,6,6,6,6,-24,-58,6,-54,-5,-46,-47,-52,-53,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,6,-55,6,-14,-25,-4,-29,-50,-51,6,-38,-39,-40,-41,-9,6,-28,-30,-6,6,-13,-17,6,-33,6,-10,6,6,-26,6,6,-27,6,6,6,6,-12,-7,6,6,6,-11,]),'FOR':([0,2,3,9,10,13,19,22,23,27,28,29,30,31,41,42,51,52,56,57,58,59,63,65,67,69,70,71,72,73,74,75,76,77,78,84,85,88,89,93,94,97,98,99,100,101,102,103,105,106,112,114,116,118,119,122,123,125,126,127,128,129,133,134,137,138,139,141,142,143,144,145,146,149,150,151,],[7,7,-3,-56,-8,-57,-2,-48,-49,7,7,7,7,-24,-58,7,-54,-5,-46,-47,-52,-53,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,7,-55,7,-14,-25,-4,-29,-50,-51,7,-38,-39,-40,-41,-9,7,-28,-30,-6,7,-13,-17,7,-33,7,-10,7,7,-26,7,7,-27,7,7,7,7,-12,-7,7,7,7,-11,]),'COMMENTS':([0,2,3,9,10,13,19,22,23,27,28,29,30,31,41,42,51,52,56,57,58,59,63,65,67,69,70,71,72,73,74,75,76,77,78,84,85,88,89,93,94,97,98,99,100,101,102,103,105,106,112,114,116,118,119,122,123,125,126,127,128,129,133,134,137,138,139,141,142,143,144,145,146,149,150,151,],[10,10,-3,-56,-8,-57,-2,-48,-49,10,10,10,10,-24,-58,10,-54,-5,-46,-47,-52,-53,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,10,-55,10,-14,-25,-4,-29,-50,-51,10,-38,-39,-40,-41,-9,10,-28,-30,-6,10,-13,-17,10,-33,10,-10,10,10,-26,10,10,-27,10,10,10,10,-12,-7,10,10,10,-11,]),'IF':([0,2,3,9,10,13,19,22,23,27,28,29,30,31,41,42,51,52,56,57,58,59,63,65,67,69,70,71,72,73,74,75,76,77,78,84,85,88,89,93,94,97,98,99,100,101,102,103,105,106,112,114,116,118,119,122,123,125,126,127,128,129,133,134,137,138,139,141,142,143,144,145,146,149,150,151,],[11,11,-3,-56,-8,-57,-2,-48,-49,11,11,11,11,-24,-58,11,-54,-5,-46,-47,-52,-53,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,11,-55,11,-14,-25,-4,-29,-50,-51,11,-38,-39,-40,-41,-9,11,-28,-30,-6,11,-13,-17,11,-33,11,-10,11,11,-26,11,11,-27,11,11,11,11,-12,-7,11,11,11,-11,]),'PRINT':([0,2,3,9,10,13,19,22,23,27,28,29,30,31,41,42,51,52,56,57,58,59,63,65,67,69,70,71,72,73,74,75,76,77,78,84,85,88,89,93,94,97,98,99,100,101,102,103,105,106,112,114,116,118,119,122,123,125,126,127,128,129,133,134,137,138,139,141,142,143,144,145,146,149,150,151,],[12,12,-3,-56,-8,-57,-2,-48,-49,12,12,12,12,-24,-58,12,-54,-5,-46,-47,-52,-53,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,12,-55,12,-14,-25,-4,-29,-50,-51,12,-38,-39,-40,-41,-9,12,-28,-30,-6,12,-13,-17,12,-33,12,-10,12,12,-26,12,12,-27,12,12,12,12,-12,-7,12,12,12,-11,]),'RETURN':([0,2,3,9,10,13,19,22,23,27,28,29,30,31,41,42,51,52,56,57,58,59,63,65,67,69,70,71,72,73,74,75,76,77,78,84,85,88,89,93,94,97,98,99,100,101,102,103,105,106,112,114,116,118,119,122,123,125,126,127,128,129,133,134,137,138,139,141,142,143,144,145,146,149,150,151,],[14,14,-3,-56,-8,-57,-2,-48,-49,14,14,14,14,-24,-58,14,-54,-5,-46,-47,-52,-53,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,14,-55,14,-14,-25,-4,-29,-50,-51,14,-38,-39,-40,-41,-9,14,-28,-30,-6,14,-13,-17,14,-33,14,-10,14,14,-26,14,14,-27,14,14,14,14,-12,-7,14,14,14,-11,]),'FUNCTION':([0,2,3,9,10,13,19,22,23,27,28,29,30,31,41,42,51,52,56,57,58,59,63,65,67,69,70,71,72,73,74,75,76,77,78,84,85,88,89,93,94,97,98,99,100,101,102,103,105,106,112,114,116,118,119,122,123,125,126,127,128,129,133,134,137,138,139,141,142,143,144,145,146,149,150,151,],[15,15,-3,-56,-8,-57,-2,-48,-49,15,15,15,15,-24,-58,15,-54,-5,-46,-47,-52,-53,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,15,-55,15,-14,-25,-4,-29,-50,-51,15,-38,-39,-40,-41,-9,15,-28,-30,-6,15,-13,-17,15,-33,15,-10,15,15,-26,15,15,-27,15,15,15,15,-12,-7,15,15,15,-11,]),'DEFINE':([0,2,3,9,10,13,19,22,23,27,28,29,30,31,41,42,51,52,56,57,58,59,63,65,67,69,70,71,72,73,74,75,76,77,78,84,85,88,89,93,94,97,98,99,100,101,102,103,105,106,112,114,116,118,119,122,123,125,126,127,128,129,133,134,137,138,139,141,142,143,144,145,146,149,150,151,],[17,17,-3,-56,-8,-57,-2,-48,-49,17,17,17,17,-24,-58,17,-54,-5,-46,-47,-52,-53,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,17,-55,17,-14,-25,-4,-29,-50,-51,17,-38,-39,-40,-41,-9,17,-28,-30,-6,17,-13,-17,17,-33,17,-10,17,17,-26,17,17,-27,17,17,17,17,-12,-7,17,17,17,-11,]),'MINUS':([0,2,3,4,5,6,8,9,10,11,13,14,18,19,20,21,22,23,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,47,49,51,52,55,56,57,58,59,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,84,85,86,88,89,92,93,94,96,97,98,99,100,101,102,103,105,106,108,112,113,114,116,118,119,120,122,123,125,126,127,128,129,131,133,134,136,137,138,139,141,142,143,144,145,146,149,150,151,],[18,18,-3,-58,33,18,18,-56,-8,18,-57,18,18,-2,18,18,-48,-49,18,18,18,18,-24,18,18,18,18,18,18,18,18,33,-58,18,33,33,18,33,18,-54,33,33,-46,-47,-52,-53,33,-20,33,-21,33,-22,33,-23,-34,-35,-36,-37,33,33,33,33,18,18,18,18,18,-55,18,33,-14,-25,18,-4,-29,18,-50,-51,18,33,33,33,33,-9,18,18,-28,33,-30,-6,18,-13,33,-17,18,-33,18,-10,18,18,18,-26,18,33,18,-27,18,18,18,18,-12,-7,18,18,18,-11,]),'LPAREN':([0,2,3,4,6,7,8,9,10,11,12,13,14,18,19,20,21,22,23,27,28,29,30,31,32,33,34,35,36,37,38,39,41,42,45,48,49,51,52,56,57,58,59,63,65,67,69,70,71,72,73,74,75,76,77,78,79,80,81,82,84,85,88,89,92,93,94,96,97,98,99,100,101,102,103,105,106,108,112,114,116,118,119,122,123,125,126,127,128,129,131,133,134,137,138,139,141,142,143,144,145,146,149,150,151,],[8,8,-3,21,8,42,8,-56,-8,8,45,-57,8,8,-2,8,8,-48,-49,8,8,8,8,-24,8,8,8,8,8,8,8,8,-58,8,8,90,8,-54,-5,-46,-47,-52,-53,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,8,8,8,8,8,-55,8,-14,-25,8,-4,-29,8,-50,-51,8,-38,-39,-40,-41,-9,8,8,-28,-30,-6,8,-13,-17,8,-33,8,-10,8,8,8,-26,8,8,-27,8,8,8,8,-12,-7,8,8,8,-11,]),'NUMBER':([0,2,3,6,8,9,10,11,13,14,18,19,20,21,22,23,24,25,27,28,29,30,31,32,33,34,35,36,37,38,39,41,42,45,49,51,52,56,57,58,59,63,65,67,69,70,71,72,73,74,75,76,77,78,79,80,81,82,84,85,88,89,92,93,94,96,97,98,99,100,101,102,103,104,105,106,108,112,114,116,118,119,122,123,125,126,127,128,129,131,133,134,137,138,139,141,142,143,144,145,146,149,150,151,],[9,9,-3,9,9,-56,-8,9,-57,9,9,-2,9,9,-48,-49,58,59,9,9,9,9,-24,9,9,9,9,9,9,9,9,-58,9,9,9,-54,-5,-46,-47,-52,-53,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,9,9,9,9,9,-55,9,-14,-25,9,-4,-29,9,-50,-51,9,-38,-39,-40,-41,117,-9,9,9,-28,-30,-6,9,-13,-17,9,-33,9,-10,9,9,9,-26,9,9,-27,9,9,9,9,-12,-7,9,9,9,-11,]),'STRING':([0,2,3,6,8,9,10,11,12,13,14,18,19,20,21,22,23,27,28,29,30,31,32,33,34,35,36,37,38,39,41,42,45,49,51,52,56,57,58,59,63,65,67,69,70,71,72,73,74,75,76,77,78,79,80,81,82,84,85,88,89,92,93,94,96,97,98,99,100,101,102,103,105,106,108,112,114,116,118,119,122,123,125,126,127,128,129,131,133,134,137,138,139,141,142,143,144,145,146,149,150,151,],[13,13,-3,13,13,-56,-8,13,46,-57,13,13,-2,13,13,-48,-49,13,13,13,13,-24,13,13,13,13,13,13,13,13,-58,13,13,13,-54,-5,-46,-47,-52,-53,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,13,13,13,13,13,-55,13,-14,-25,13,-4,-29,13,-50,-51,13,-38,-39,-40,-41,-9,13,13,-28,-30,-6,13,-13,-17,13,-33,13,-10,13,13,13,-26,13,13,-27,13,13,13,13,-12,-7,13,13,13,-11,]),'$end':([1,2,3,9,10,13,19,22,23,31,41,51,52,56,57,58,59,63,65,67,69,70,71,72,73,74,75,76,77,84,88,89,93,94,97,98,100,101,102,103,105,112,114,116,119,122,125,127,133,138,144,145,151,],[0,-1,-3,-56,-8,-57,-2,-48,-49,-24,-58,-54,-5,-46,-47,-52,-53,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,-55,-14,-25,-4,-29,-50,-51,-38,-39,-40,-41,-9,-28,-30,-6,-13,-17,-33,-10,-26,-27,-12,-7,-11,]),'LACC':([3,9,10,13,19,22,23,31,41,51,52,56,57,58,59,63,65,67,69,70,71,72,73,74,75,76,77,84,88,89,93,94,97,98,99,100,101,102,103,105,112,114,116,118,119,122,125,127,133,138,141,142,144,145,146,150,151,],[-3,-56,-8,-57,-2,-48,-49,-24,-58,-54,-5,-46,-47,-52,-53,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,-55,-14,-25,-4,-29,-50,-51,116,-38,-39,-40,-41,-9,-28,-30,-6,127,-13,-17,-33,-10,-26,-27,144,145,-12,-7,147,151,-11,]),'END':([3,9,10,13,19,22,23,31,41,51,52,56,57,58,59,63,65,67,69,70,71,72,73,74,75,76,77,84,88,89,93,94,97,98,100,101,102,103,105,112,114,116,119,122,125,127,128,133,134,138,144,145,151,],[-3,-56,-8,-57,-2,-48,-49,-24,-58,-54,-5,-46,-47,-52,-53,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,-55,-14,-25,-4,-29,-50,-51,-38,-39,-40,-41,-9,-28,-30,-6,-13,-17,-33,-10,133,-26,138,-27,-12,-7,-11,]),'EQUALS':([4,16,50,60,61,],[20,49,92,-18,-19,]),'INCR':([4,],[22,]),'DECR':([4,],[23,]),'PLUSEQ':([4,],[24,]),'MINEQ':([4,],[25,]),'INFF':([4,5,9,13,40,41,43,44,47,51,52,55,62,64,66,68,70,71,72,73,74,75,76,77,84,86,100,101,102,103,113,120,136,],[-58,27,-56,-57,82,-58,82,82,82,-54,82,82,27,-40,-39,-38,-34,-35,-36,-37,82,82,82,82,-55,82,-38,-39,-40,82,82,82,82,]),'SUP':([4,5,9,13,40,41,43,44,47,51,52,55,62,64,66,68,70,71,72,73,74,75,76,77,84,86,100,101,102,103,113,120,136,],[-58,28,-56,-57,81,-58,81,81,81,-54,81,81,28,28,28,28,-34,-35,-36,-37,81,81,81,81,-55,81,81,81,None,81,81,81,81,]),'and':([4,5,9,13,40,41,43,44,47,51,52,55,62,64,66,68,70,71,72,73,74,75,76,77,84,86,100,101,102,103,113,120,136,],[-58,29,-56,-57,80,-58,80,80,80,-54,80,80,29,-40,-39,29,-34,-35,-36,-37,80,80,80,80,-55,80,80,-39,-40,80,80,80,80,]),'or':([4,5,9,13,40,41,43,44,47,51,52,55,62,64,66,68,70,71,72,73,74,75,76,77,84,86,100,101,102,103,113,120,136,],[-58,30,-56,-57,79,-58,79,79,79,-54,79,79,30,-40,-39,-38,-34,-35,-36,-37,79,79,79,79,-55,79,-38,-39,-40,79,79,79,79,]),'SEMI':([4,5,9,13,22,23,41,46,47,51,52,53,55,58,59,62,64,66,68,70,71,72,73,74,75,76,77,84,91,95,100,101,102,103,107,109,113,115,],[-58,31,-56,-57,56,57,-58,88,89,-54,93,94,-31,97,98,31,-40,-39,-38,-34,-35,-36,-37,-42,-43,-44,-45,-55,112,114,-38,-39,-40,-41,119,122,125,-32,]),'PLUS':([4,5,9,13,40,41,43,44,47,51,52,55,62,64,66,68,70,71,72,73,74,75,76,77,84,86,100,101,102,103,113,120,136,],[-58,32,-56,-57,32,-58,32,32,32,-54,32,32,32,32,32,32,-34,-35,-36,-37,32,32,32,32,-55,32,32,32,32,32,32,32,32,]),'TIMES':([4,5,9,13,40,41,43,44,47,51,52,55,62,64,66,68,70,71,72,73,74,75,76,77,84,86,100,101,102,103,113,120,136,],[-58,34,-56,-57,34,-58,34,34,34,34,34,34,34,34,34,34,34,34,-36,-37,34,34,34,34,-55,34,34,34,34,34,34,34,34,]),'DIVIDE':([4,5,9,13,40,41,43,44,47,51,52,55,62,64,66,68,70,71,72,73,74,75,76,77,84,86,100,101,102,103,113,120,136,],[-58,35,-56,-57,35,-58,35,35,35,35,35,35,35,35,35,35,35,35,-36,-37,35,35,35,35,-55,35,35,35,35,35,35,35,35,]),'ISEQUAL':([4,5,9,13,40,41,43,44,47,51,52,55,62,64,66,68,70,71,72,73,74,75,76,77,84,86,100,101,102,103,113,120,136,],[-58,36,-56,-57,36,-58,36,36,36,-54,36,36,36,-40,-39,-38,-34,-35,-36,-37,36,36,36,36,-55,36,-38,-39,-40,36,36,36,36,]),'NOTEQUAL':([4,5,9,13,40,41,43,44,47,51,52,55,62,64,66,68,70,71,72,73,74,75,76,77,84,86,100,101,102,103,113,120,136,],[-58,37,-56,-57,37,-58,37,37,37,-54,37,37,37,-40,-39,-38,-34,-35,-36,-37,37,37,37,37,-55,37,-38,-39,-40,37,37,37,37,]),'ET':([4,5,9,13,40,41,43,44,47,51,52,55,62,64,66,68,70,71,72,73,74,75,76,77,84,86,100,101,102,103,113,120,136,],[-58,38,-56,-57,38,-58,38,38,38,-54,38,38,38,-40,-39,-38,-34,-35,-36,-37,38,38,38,38,-55,38,-38,-39,-40,38,38,38,38,]),'OU':([4,5,9,13,40,41,43,44,47,51,52,55,62,64,66,68,70,71,72,73,74,75,76,77,84,86,100,101,102,103,113,120,136,],[-58,39,-56,-57,39,-58,39,39,39,-54,39,39,39,-40,-39,-38,-34,-35,-36,-37,39,39,39,39,-55,39,-38,-39,-40,39,39,39,39,]),'COMMA':([4,9,13,41,51,55,60,70,71,72,73,74,75,76,77,84,86,100,101,102,103,117,120,],[26,-56,-57,-58,-54,96,26,-34,-35,-36,-37,-42,-43,-44,-45,-55,108,-38,-39,-40,-41,126,108,]),'RACC':([9,13,40,41,51,70,71,72,73,74,75,76,77,84,85,100,101,102,103,132,135,140,148,],[-56,-57,78,-58,-54,-34,-35,-36,-37,-42,-43,-44,-45,-55,106,-38,-39,-40,-41,137,139,143,149,]),'RPAREN':([9,10,13,21,22,23,31,41,43,51,52,54,55,56,57,58,59,60,61,63,65,67,69,70,71,72,73,74,75,76,77,84,86,87,88,89,90,93,94,97,98,100,101,102,103,105,111,112,114,115,116,119,120,121,122,125,127,130,133,138,144,145,151,],[-56,-8,-57,53,-48,-49,-24,-58,84,-54,-5,95,-31,-46,-47,-52,-53,-18,-19,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,-55,107,109,-14,-25,110,-4,-29,-50,-51,-38,-39,-40,-41,-9,124,-28,-30,-32,-6,-13,-15,-16,-17,-33,-10,135,-26,-27,-12,-7,-11,]),'THEN':([9,13,41,44,51,70,71,72,73,74,75,76,77,84,100,101,102,103,136,],[-56,-57,-58,85,-54,-34,-35,-36,-37,-42,-43,-44,-45,-55,-38,-39,-40,-41,140,]),'TO':([9,10,13,22,23,31,41,51,52,56,57,58,59,63,65,67,69,70,71,72,73,74,75,76,77,83,84,88,89,93,94,97,98,100,101,102,103,105,112,114,116,119,122,125,127,133,138,144,145,151,],[-56,-8,-57,-48,-49,-24,-58,-54,-5,-46,-47,-52,-53,-20,-21,-22,-23,-34,-35,-36,-37,-42,-43,-44,-45,104,-55,-14,-25,-4,-29,-50,-51,-38,-39,-40,-41,-9,-28,-30,-6,-13,-17,-33,-10,-26,-27,-12,-7,-11,]),'START':([110,124,],[123,129,]),'ELSEIF':([127,],[131,]),'ELSE':([127,147,],[132,148,]),}

_lr_action = {}
for _k, _v in _lr_action_items.items():
   for _x,_y in zip(_v[0],_v[1]):
      if not _x in _lr_action:  _lr_action[_x] = {}
      _lr_action[_x][_k] = _y
del _lr_action_items

_lr_goto_items = {'start':([0,],[1,]),'bloc':([0,78,106,123,129,137,139,143,149,],[2,99,118,128,134,141,142,146,150,]),'statement':([0,2,27,28,29,30,42,78,85,99,106,118,123,126,128,129,134,137,139,141,142,143,146,149,150,],[3,19,63,65,67,69,83,3,105,19,3,19,3,130,19,3,19,3,3,19,19,3,19,3,19,]),'expression':([0,2,6,8,11,14,18,20,21,27,28,29,30,32,33,34,35,36,37,38,39,42,45,49,78,79,80,81,82,85,92,96,99,106,108,118,123,126,128,129,131,134,137,139,141,142,143,146,149,150,],[5,5,40,43,44,47,51,52,55,62,64,66,68,70,71,72,73,74,75,76,77,5,86,55,5,100,101,102,103,5,113,55,5,5,120,5,5,5,5,5,136,5,5,5,5,5,5,5,5,5,]),'params':([0,2,26,27,28,29,30,42,78,85,90,99,106,118,123,126,128,129,134,137,139,141,142,143,146,149,150,],[16,16,61,16,16,16,16,16,16,16,111,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,]),'param_call':([21,49,96,],[54,91,115,]),'print_params':([45,108,],[87,121,]),}

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
  ('statement -> WHILE expression RACC bloc LACC','statement',5,'p_while_statement','parse.py',30),
  ('statement -> FOR LPAREN statement TO NUMBER COMMA statement RPAREN RACC bloc LACC','statement',11,'p_for_loop','parse.py',34),
  ('statement -> COMMENTS','statement',1,'p_statement_comment','parse.py',39),
  ('statement -> IF expression THEN statement','statement',4,'p_if_els_statement','parse.py',43),
  ('statement -> IF expression THEN RACC bloc LACC','statement',6,'p_if_els_statement','parse.py',44),
  ('statement -> IF expression THEN RACC bloc LACC ELSEIF expression THEN RACC bloc LACC ELSE RACC bloc LACC','statement',16,'p_if_els_statement','parse.py',45),
  ('statement -> IF expression THEN RACC bloc LACC ELSE RACC bloc LACC','statement',10,'p_if_els_statement','parse.py',46),
  ('statement -> PRINT LPAREN expression RPAREN SEMI','statement',5,'p_statement_print','parse.py',55),
  ('statement -> PRINT STRING SEMI','statement',3,'p_statement_print','parse.py',56),
  ('print_params -> expression','print_params',1,'p_print_prams','parse.py',65),
  ('print_params -> expression COMMA print_params','print_params',3,'p_print_prams','parse.py',66),
  ('statement -> PRINT LPAREN print_params RPAREN SEMI','statement',5,'p_multi_print','parse.py',76),
  ('params -> NAME','params',1,'p_parameters','parse.py',81),
  ('params -> NAME COMMA params','params',3,'p_parameters','parse.py',82),
  ('statement -> expression INFF statement','statement',3,'p_multi_compare','parse.py',90),
  ('statement -> expression SUP statement','statement',3,'p_multi_compare','parse.py',91),
  ('statement -> expression and statement','statement',3,'p_multi_compare','parse.py',92),
  ('statement -> expression or statement','statement',3,'p_multi_compare','parse.py',93),
  ('statement -> expression SEMI','statement',2,'p_multi_compare','parse.py',94),
  ('statement -> RETURN expression SEMI','statement',3,'p_return_statamene','parse.py',103),
  ('statement -> FUNCTION NAME LPAREN RPAREN START bloc END','statement',7,'p_function','parse.py',108),
  ('statement -> FUNCTION NAME LPAREN params RPAREN START bloc END','statement',8,'p_function','parse.py',109),
  ('statement -> params EQUALS param_call SEMI','statement',4,'p_multi_assigne','parse.py',119),
  ('statement -> NAME LPAREN RPAREN SEMI','statement',4,'p_function_call','parse.py',125),
  ('statement -> NAME LPAREN param_call RPAREN SEMI','statement',5,'p_function_call','parse.py',126),
  ('param_call -> expression','param_call',1,'p_expressions','parse.py',133),
  ('param_call -> expression COMMA param_call','param_call',3,'p_expressions','parse.py',134),
  ('statement -> DEFINE NAME EQUALS expression SEMI','statement',5,'p_global_variables','parse.py',143),
  ('expression -> expression PLUS expression','expression',3,'p_expression_binop','parse.py',149),
  ('expression -> expression MINUS expression','expression',3,'p_expression_binop','parse.py',150),
  ('expression -> expression TIMES expression','expression',3,'p_expression_binop','parse.py',151),
  ('expression -> expression DIVIDE expression','expression',3,'p_expression_binop','parse.py',152),
  ('expression -> expression or expression','expression',3,'p_expression_binop','parse.py',153),
  ('expression -> expression and expression','expression',3,'p_expression_binop','parse.py',154),
  ('expression -> expression SUP expression','expression',3,'p_expression_binop','parse.py',155),
  ('expression -> expression INFF expression','expression',3,'p_expression_binop','parse.py',156),
  ('expression -> expression ISEQUAL expression','expression',3,'p_expression_binop','parse.py',157),
  ('expression -> expression NOTEQUAL expression','expression',3,'p_expression_binop','parse.py',158),
  ('expression -> expression ET expression','expression',3,'p_expression_binop','parse.py',159),
  ('expression -> expression OU expression','expression',3,'p_expression_binop','parse.py',160),
  ('statement -> NAME INCR SEMI','statement',3,'p_incr_decr','parse.py',167),
  ('statement -> NAME DECR SEMI','statement',3,'p_incr_decr','parse.py',168),
  ('statement -> NAME INCR','statement',2,'p_incr_decr','parse.py',169),
  ('statement -> NAME DECR','statement',2,'p_incr_decr','parse.py',170),
  ('statement -> NAME PLUSEQ NUMBER SEMI','statement',4,'p_plus_min_eq','parse.py',180),
  ('statement -> NAME MINEQ NUMBER SEMI','statement',4,'p_plus_min_eq','parse.py',181),
  ('statement -> NAME PLUSEQ NUMBER','statement',3,'p_plus_min_eq','parse.py',182),
  ('statement -> NAME MINEQ NUMBER','statement',3,'p_plus_min_eq','parse.py',183),
  ('expression -> MINUS expression','expression',2,'p_expression_uminus','parse.py',191),
  ('expression -> LPAREN expression RPAREN','expression',3,'p_expression_group','parse.py',195),
  ('expression -> NUMBER','expression',1,'p_expression_number','parse.py',199),
  ('expression -> STRING','expression',1,'p_expression_str','parse.py',203),
  ('expression -> NAME','expression',1,'p_expression_name','parse.py',207),
]
