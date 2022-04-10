from macro_calculus import get_avg_macros

test = get_avg_macros(weight=91, height= 180, age = 26, gender = "M")

print("TMP: ", test.tmp)
print("Carbo cals: ", test.carbo_cals)
print("prot cals: ", test.prot_cals)
print("fat cals: ", test.fat_cals)
print("Carbo g: ", test.carbo_g)
print("prot g: ", test.prot_g)
print("fat g: ", test.fat_g)
