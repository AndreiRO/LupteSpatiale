from BitVector import BitVector
import time

class GOLGrid:
	""" Class for representing the internal grid of Conway`s game """
	
	def __init__(self, sleep_time = 2):
		self.sleep_time = sleep_time


	def next_step(self):
		index = 0
		line = 0
		column = 0
		
		while line < self.lines:
			column = 0
			while column < self.columns:
				count = self.get_neighbors_count(line, column)
				
				"""
					Conway GOL logic
					< 2 dies
					2 <= c <= 3 lives
					> 3 dies
					= 3 and dead => borns

				 """
				current_cell = self.get_cell((line, column))
				
				if current_cell == 0 and count == 3:
					self.set_cell(line,column,1)

				elif current_cell == 1:	
					if count > 3:
						self.set_cell(line, column, 0)
				
					elif 2 <= count <= 3:
						self.set_cell(line, column, 1)

					elif count < 2:
						self.set_cell(line, column, 0)

				column += 1
		
			line += 1




	def read_from_comsole(self):
		print "Enter the number of lines in the grid:"
		lines  = int(raw_input())
		print "Enter the number of columns in the grid:"
		columns = int(raw_input())
		
		grid_size = lines*columns
		self.current_state = BitVector(size = grid_size)
		self.old_state     = BitVector(size = grid_size)
		self.columns = columns	
		self.lines   = columns	

		index = 0
		for i in range(lines):
			print "Enter line:"
			line = raw_input()
	
			for cell in line:
				if cell == '*':
					self.current_state[index] = 1
					self.old_state[index] = 1
					index += 1
				elif cell == 'o':
					self.current_state[index] = 0
					self.old_state[index] = 0
					index += 1

		print "Grid was entered:"
		self.render()

	#number number
	#lines ....
	#lines ....
	def read_from_file(self, file_name):
		with open(file_name, 'r') as file:
			initialized = False
			
			index = 0
			for line in file:
				temp = line.split()

				if not initialized:
					#get columns get lines		
					lines   = int(temp[0])
					columns = int(temp[1])

					grid_size = lines*columns
					self.lines   = lines
					self.columns = columns

					self.current_state = BitVector(size = grid_size)
					self.old_state     = BitVector(size = grid_size)
					initialized = True
				
				else:
					temp = line.split()
					
					for cell in temp:

						if cell  == '*':
							self.current_state[index] = 1
							self.old_state[index] = 1
							index += 1					
						elif cell == 'o':
							self.current_state[index] = 0
							self.old_state[index] = 0	
							index += 1
						

		self.render()	

	def read_grid(self, from_file = True):
		if from_file:
			self.read_from_file("gol.in")
		else:	
			self.read_from_console()
	
	def render(self):
		index = 0
		for i in range(self.lines):
			line = ''
			for j in range(self.columns):
				if self.current_state[index] == 0:
					line += "o "
				#	line += str(self.get_neighbors_count(i,j)) + ' '
				else:
					line += "* "
				#	line += str(self.get_neighbors_count(i,j)) + ' '					
				index += 1			
			print line

		print
		print


	def start_game(self):
		self.read_grid()

		while self.check():
			time.sleep(self.sleep_time)
			self.next_step()
			self.render()	
			self.copy()


	def check(self):
		return True if BitVector(bitstring = '1') in self.current_state else False

	def set_cell(self, line, column, value):
		self.current_state[line*self.columns + column] = value

	def get_cell(self, point):
		#print "Point: (%d,%d) is%s:" % (point[0], point[1], str(self.old_state[point[0]*self.columns + point[1]]))
		return self.old_state[point[0]*self.columns + point[1]]


	def get_neighbors_count(self, line, column):
		n_neigh = (line - 1, column)		
		n_e_neigh = (line - 1, column + 1)
		n_v_neigh = (line - 1, column - 1)
		e_neigh = (line, column + 1)
		v_neigh = (line, column - 1)
		s_neigh = (line + 1, column)
		s_e_neigh = (line + 1, column + 1)
		s_v_neigh = (line + 1, column - 1)

		if line == 0:
			n_neigh = (self.lines - 1, column)
			n_e_neigh = (self.lines - 1, column + 1)
			n_v_neigh = (self.lines - 1, column - 1)

		elif line == self.lines-1:
			s_neigh = (0, column)
			s_e_neigh = (0, column + 1)
			s_v_neigh = (0, column - 1)		
		

		if column == 0:
			v_neigh = (line, self.columns - 1)
			s_v_neigh = (s_e_neigh[0], self.columns - 1)
			n_v_neigh = (n_e_neigh[0], self.columns - 1)

		elif column == self.columns - 1:
			e_neigh = (line, 0)
			s_e_neigh = (s_e_neigh[0], 0)
			n_e_neigh = (n_e_neigh[0], 0)

		count = 0

		if self.get_cell(n_neigh) == 1:
			#print "North %d %d" % n_neigh
			count += 1
		if self.get_cell(n_e_neigh) == 1:
			#print "North_e %d %d" % n_e_neigh
			count += 1
		if self.get_cell(n_v_neigh) == 1:
			#print "North_v %d %d" % n_v_neigh
			count += 1
		if self.get_cell(e_neigh) == 1:
			#print "East %d %d" % e_neigh
			count += 1
		if self.get_cell(v_neigh) == 1:
			#print "West %d %d" % v_neigh
			count += 1
		if self.get_cell(s_neigh) == 1:
			#print "Sout %d %d" % s_neigh
			count += 1
		if self.get_cell(s_e_neigh) == 1:
			#print "South_e %d %d" % s_e_neigh
			count += 1
		if self.get_cell(s_v_neigh) == 1:
			#print "South_v %d %d" % s_v_neigh
			count += 1
	
		return count


	def copy(self):
		index = 0
		for bit in self.current_state:
			self.old_state[index] = bit
			index += 1 


def main():
	gol = GOLGrid(sleep_time = 1)
	gol.start_game()


if __name__ == '__main__':
	main()
