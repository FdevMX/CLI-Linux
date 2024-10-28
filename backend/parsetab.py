
# parsetab.py
# This file is automatically generated. Do not edit.
# pylint: disable=W,C,R
_tabversion = '3.10'

_lr_method = 'LALR'

_lr_signature = 'ARGUMENT COMMAND\n    command : COMMAND\n            | COMMAND ARGUMENTS\n    \n    ARGUMENTS : ARGUMENT\n              | ARGUMENT ARGUMENTS\n    '
    
_lr_action_items = {'COMMAND':([0,],[2,]),'$end':([1,2,3,4,5,],[0,-1,-2,-3,-4,]),'ARGUMENT':([2,4,],[4,4,]),}

_lr_action = {}
for _k, _v in _lr_action_items.items():
   for _x,_y in zip(_v[0],_v[1]):
      if not _x in _lr_action:  _lr_action[_x] = {}
      _lr_action[_x][_k] = _y
del _lr_action_items

_lr_goto_items = {'command':([0,],[1,]),'ARGUMENTS':([2,4,],[3,5,]),}

_lr_goto = {}
for _k, _v in _lr_goto_items.items():
   for _x, _y in zip(_v[0], _v[1]):
       if not _x in _lr_goto: _lr_goto[_x] = {}
       _lr_goto[_x][_k] = _y
del _lr_goto_items
_lr_productions = [
  ("S' -> command","S'",1,None,None,None),
  ('command -> COMMAND','command',1,'p_command','cli.py',31),
  ('command -> COMMAND ARGUMENTS','command',2,'p_command','cli.py',32),
  ('ARGUMENTS -> ARGUMENT','ARGUMENTS',1,'p_arguments','cli.py',38),
  ('ARGUMENTS -> ARGUMENT ARGUMENTS','ARGUMENTS',2,'p_arguments','cli.py',39),
]
