import pygame

def setup():

    pygame.init()

    win = pygame.display.set_mode((500,500))

    pygame.display.set_caption("Slay")

def loop():

    while True:

        pygame.time.delay(100)

        